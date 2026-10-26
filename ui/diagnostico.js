/*
 * SystemDesing — Diagnóstico v0.4.0
 * Yan Nunes · Sistemas & Consultoria
 * https://github.com/Yanunesxz/SystemDesing
 *
 * Testa as 17 regras de conformidade do padrão (docs/07-diagnostico-e-conformidade.md)
 * nas páginas do próprio sistema, no navegador de quem é administrador.
 * Sem dependência. A aba usa as classes de ui/componentes.css (.yn-audit).
 *
 * Uso:
 *   <div id="diagnostico"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.4.0/ui/diagnostico.js"></script>
 *   <script>
 *     YNDiagnostico.montar(document.getElementById("diagnostico"), {
 *       perfil: { publico: false, vende: false, rastreamento: false, dadosPessoais: true },
 *       paginas: ["/", "/clientes", "/pedidos"],
 *       larguras: [375, 1280, 1920]
 *     });
 *   </script>
 *
 * Como funciona: abre cada página escondida (iframe do mesmo site), em cada largura, lê a tela
 * e devolve um resultado por regra: ok, warn (atenção), fail (falhou), manual (conferir) ou na
 * (não se aplica a este sistema). Não clica, não grava e não envia nada para fora.
 * Abrir a página é igual a visitá-la: não liste página que grava alguma coisa só de abrir.
 * O resultado é um alerta técnico, não parecer jurídico.
 */
(function (global) {
  "use strict";

  var VERSAO = "0.4.0";

  /* ---------- Ícones (Lucide 1.49, ISC) ---------- */
  var ICONES = {
    ok: '<circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>',
    warn: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    fail: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    manual: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    na: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/>',
    play: '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
  };

  function icone(nome) {
    return '<svg class="lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONES[nome] + "</svg>";
  }

  var STATUS = {
    fail: { rotulo: "Falhou", tom: "danger", peso: 4 },
    warn: { rotulo: "Atenção", tom: "warning", peso: 3 },
    manual: { rotulo: "Conferir", tom: "info", peso: 2 },
    ok: { rotulo: "OK", tom: "success", peso: 1 },
    na: { rotulo: "Não se aplica", tom: "", peso: 0 }
  };

  function pior(lista) {
    return lista.reduce(function (a, b) { return STATUS[b].peso > STATUS[a].peso ? b : a; }, "ok");
  }

  /* ---------- Utilidades ---------- */
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function curto(t, n) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    n = n || 60;
    return t.length > n ? t.slice(0, n - 1) + "…" : t;
  }

  function unicos(lista) {
    var visto = {};
    return lista.filter(function (x) { var k = String(x); if (visto[k]) return false; visto[k] = true; return true; });
  }

  function descrever(el) {
    var d = el.tagName.toLowerCase();
    if (el.id) d += "#" + el.id;
    var cls = (typeof el.className === "string" ? el.className : "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
    if (cls.length) d += "." + cls.join(".");
    return d;
  }

  function visivel(el, win) {
    if (!el.getClientRects().length) return false;
    var cs = win.getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none";
  }

  function nomeAcessivel(el, doc) {
    var a = el.getAttribute("aria-label");
    if (a && a.trim()) return a.trim();
    var lb = el.getAttribute("aria-labelledby");
    if (lb) {
      var t = lb.split(/\s+/).map(function (id) { var x = doc.getElementById(id); return x ? x.textContent : ""; }).join(" ").trim();
      if (t) return t;
    }
    if (el.labels && el.labels.length) {
      var l = Array.prototype.map.call(el.labels, function (x) { return x.textContent; }).join(" ").trim();
      if (l) return l;
    }
    if (!/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
      var tx = (el.textContent || "").trim();
      if (tx) return tx;
      var img = el.querySelector("img[alt]");
      if (img && img.getAttribute("alt").trim()) return img.getAttribute("alt").trim();
      var st = el.querySelector("svg title");
      if (st && st.textContent.trim()) return st.textContent.trim();
    }
    if (el.tagName === "INPUT" && /^(submit|button|reset)$/.test(el.type) && el.value) return el.value;
    var ti = el.getAttribute("title");
    if (ti && ti.trim()) return ti.trim();
    return "";
  }

  function rotuloCampo(el, doc) {
    var n = nomeAcessivel(el, doc);
    return n || el.getAttribute("placeholder") || el.name || el.id || descrever(el);
  }

  /* Converte qualquer cor do CSS (rgb, oklab, color-mix...) em [r, g, b, a] pelo canvas */
  var canvasCor = null;
  function cor(css) {
    if (!css || css === "transparent") return [0, 0, 0, 0];
    if (!canvasCor) {
      canvasCor = document.createElement("canvas");
      canvasCor.width = canvasCor.height = 1;
    }
    var c = canvasCor.getContext("2d", { willReadFrequently: true });
    c.clearRect(0, 0, 1, 1);
    c.fillStyle = "rgba(0, 0, 0, 0)";
    c.fillStyle = css;
    c.fillRect(0, 0, 1, 1);
    var d = c.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  }

  function misturar(cima, baixo) {
    var a = cima[3];
    return [cima[0] * a + baixo[0] * (1 - a), cima[1] * a + baixo[1] * (1 - a), cima[2] * a + baixo[2] * (1 - a), 1];
  }

  function luminancia(c) {
    var v = c.slice(0, 3).map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }

  function razao(a, b) {
    var x = luminancia(a), y = luminancia(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  /* Fundo efetivo atrás do elemento; null se houver imagem ou degradê (não dá para medir) */
  function fundo(el, win) {
    var camadas = [];
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
      var cs = win.getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
      var c = cor(cs.backgroundColor);
      if (c[3] > 0) {
        camadas.push(c);
        if (c[3] >= 0.999) break;
      }
    }
    var r = [255, 255, 255, 1];
    for (var i = camadas.length - 1; i >= 0; i--) r = misturar(camadas[i], r);
    return r;
  }

  function opacidade(el, win) {
    var o = 1;
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) o *= parseFloat(win.getComputedStyle(n).opacity) || 0;
    return o;
  }

  /* ---------- Listas do que procurar ---------- */
  var RASTREADORES = [
    [/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/, "Google Analytics / Tag Manager"],
    [/doubleclick\.net|googleadservices\.com|googlesyndication\.com/, "Google Ads"],
    [/connect\.facebook\.net|facebook\.com\/tr/, "Meta Pixel"],
    [/analytics\.tiktok\.com/, "TikTok Pixel"],
    [/hotjar\.(com|io)/, "Hotjar"],
    [/clarity\.ms/, "Microsoft Clarity"],
    [/bat\.bing\.com/, "Microsoft Ads"],
    [/snap\.licdn\.com|px\.ads\.linkedin\.com/, "LinkedIn Insight"],
    [/posthog\.com/, "PostHog"],
    [/mixpanel\.com/, "Mixpanel"],
    [/amplitude\.com/, "Amplitude"],
    [/hs-scripts\.com|hs-analytics\.net/, "HubSpot"],
    [/ct\.pinterest\.com|s\.pinimg\.com\/ct/, "Pinterest Tag"],
    [/sc-static\.net|tr\.snapchat\.com/, "Snap Pixel"],
    [/rdstation/, "RD Station"]
  ];

  var GLOBAIS = { gtag: "Google Analytics / Tag Manager", dataLayer: "Google Tag Manager", fbq: "Meta Pixel", ttq: "TikTok Pixel", hj: "Hotjar", clarity: "Microsoft Clarity", uetq: "Microsoft Ads", lintrk: "LinkedIn Insight", posthog: "PostHog", mixpanel: "Mixpanel", amplitude: "Amplitude", _hsq: "HubSpot", pintrk: "Pinterest Tag", snaptr: "Snap Pixel", RdIntegration: "RD Station" };

  var COOKIES_RASTREIO = /^(_ga|_gid|_gat|_gcl_|_fbp|_fbc|_ttp|_tt_|_hj|_clck|_clsk|_uet|__hstc|hubspotutk|li_fat_id|_pin_|_scid|ph_|mp_|amp_|rdtrk)/;

  var PROMESSAS = [
    [/\bgarantid[oa]s?\b/i, "\"garantido\""],
    [/\b100\s?%/, "\"100%\""],
    [/\bcura(r|m)?\b|\bcurativ/i, "promessa de cura"],
    [/milagr/i, "\"milagre\""],
    [/resultados? (imediatos?|garantidos?|em \d+ dias)/i, "resultado prometido"],
    [/sem (nenhum )?(risco|efeitos? colaterais)/i, "\"sem risco\""],
    [/\b(o|a) (melhor|mais barat[oa]) do (brasil|mercado|mundo)\b/i, "superlativo sem prova"],
    [/clinicamente comprovad|cientificamente comprovad/i, "\"comprovado\" (tem o estudo?)"],
    [/aprovado pela anvisa|registrad[oa] na anvisa/i, "Anvisa (tem o número do registro?)"],
    [/\b(ganhe|fature|lucre) (r\$ ?)?\d/i, "promessa de ganho"],
    [/(últimas|poucas) unidades|só hoje|últimas horas/i, "urgência (é verdade?)"]
  ];

  var SENSIVEIS = /ra[cç]a|cor da pele|etnia|religi|partido|pol[ií]tic|sindica|sa[uú]de|doen[cç]a|alergi|medica[cç]|medicamento|defici[eê]ncia|sexual|gen[eé]tic|biometr|impress[aã]o digital/i;
  var SO_SE_PRECISAR = /\bcpf\b|\brg\b|identidade|nascimento|\bidade\b|\bsexo\b|g[eê]nero|estado civil|renda|sal[aá]rio|profiss|nome da m[aã]e|nome do pai|selfie|foto do documento/i;
  var DADO_PESSOAL = /\bnome\b|\bname\b|e-?mail|telefone|celular|whats|\bcpf\b|\bcnpj\b|endere[cç]o|\bcep\b|nascimento|\brg\b/i;
  var MARKETING = /novidade|oferta|promo[cç]|marketing|newsletter|cupo[mn]|desconto|lan[cç]amento|receber (conte[uú]do|comunica|mensage)|comunica[cç][oõ]es/i;

  /* ---------- Leitura de uma página ---------- */
  function coletar(doc, win, largura, url, completo) {
    var f = { url: url, largura: largura, titulo: doc.title || "" };
    var raiz = doc.documentElement;

    /* Responsivo e espaço */
    f.overflow = raiz.scrollWidth > win.innerWidth + 1;
    f.culpados = [];
    if (f.overflow) {
      /* Quem passa da tela: fica com os mais "de dentro" e mais largos, que costumam ser a causa */
      var passa = Array.prototype.filter.call(doc.body.querySelectorAll("*"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.right <= win.innerWidth + 1 || !r.width || el.closest("svg") !== null && el.tagName.toLowerCase() !== "svg") return false;
        for (var p = el.parentElement; p && p !== doc.body; p = p.parentElement) {
          var ox = win.getComputedStyle(p).overflowX;
          if (ox === "auto" || ox === "scroll" || ox === "hidden" || ox === "clip") return false;
        }
        return true;
      });
      f.culpados = passa.filter(function (el) { return !passa.some(function (o) { return o !== el && el.contains(o); }); })
        .sort(function (a, b) { return b.getBoundingClientRect().width - a.getBoundingClientRect().width; })
        .slice(0, 3).map(function (el) { return descrever(el) + " com " + Math.round(el.getBoundingClientRect().width) + "px"; });
    }
    f.espaco = null;
    var area = doc.querySelector(".yn-content") || doc.querySelector("main");
    if (area && largura >= 1200) {
      var pai = area.parentElement;
      var csPai = win.getComputedStyle(pai);
      var disponivel = pai.clientWidth - parseFloat(csPai.paddingLeft) - parseFloat(csPai.paddingRight);
      var ra = area.getBoundingClientRect();
      var csA = win.getComputedStyle(area);
      var usado = 0;
      Array.prototype.forEach.call(area.children, function (c) {
        var rc = c.getBoundingClientRect();
        if (rc.width) usado = Math.max(usado, rc.right - ra.left - parseFloat(csA.paddingLeft));
      });
      var util = ra.width - parseFloat(csA.paddingLeft) - parseFloat(csA.paddingRight);
      var rolaComEspaco = Array.prototype.some.call(area.querySelectorAll("*"), function (el) {
        var ox = win.getComputedStyle(el).overflowX;
        return (ox === "auto" || ox === "scroll") && el.scrollWidth > el.clientWidth + 8 && el.getBoundingClientRect().width < util * 0.85;
      });
      f.espaco = {
        estreito: area.classList.contains("yn-content--narrow"),
        trabalho: !!area.querySelector("table, .yn-kanban, .yn-inbox, .yn-table-wrap, [role=grid], .yn-catalog"),
        uso: disponivel > 0 ? Math.min(1, Math.min(ra.width, usado + parseFloat(csA.paddingLeft) + parseFloat(csA.paddingRight)) / disponivel) : 1,
        rolaComEspaco: rolaComEspaco
      };
    }

    /* Texto pequeno */
    var textos = [];
    var walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest("script, style, noscript, svg, template")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var vistos = new Set();
    while (walker.nextNode() && textos.length < 600) {
      var p = walker.currentNode.parentElement;
      if (vistos.has(p)) continue;
      vistos.add(p);
      if (visivel(p, win)) textos.push(p);
    }
    f.textoPequeno = unicos(textos.filter(function (el) { return parseFloat(win.getComputedStyle(el).fontSize) < 11.5; })
      .map(function (el) { return curto(el.textContent, 30) + " (" + Math.round(parseFloat(win.getComputedStyle(el).fontSize)) + "px)"; })).slice(0, 6);

    if (!completo) return f;

    f.lang = (raiz.getAttribute("lang") || "").trim();
    f.h1 = Array.prototype.filter.call(doc.querySelectorAll("h1"), function (h) { return visivel(h, win); }).length;
    var vp = doc.querySelector('meta[name="viewport"]');
    var vpc = vp ? vp.getAttribute("content") || "" : "";
    var maxEscala = /maximum-scale\s*=\s*([\d.]+)/.exec(vpc);
    f.zoomBloqueado = /user-scalable\s*=\s*(no|0)/i.test(vpc) || (maxEscala && parseFloat(maxEscala[1]) < 2);
    f.texto = (doc.body.innerText || "").slice(0, 40000);

    f.links = Array.prototype.map.call(doc.querySelectorAll("a[href]"), function (a) {
      return { texto: (a.textContent || "").trim(), href: a.getAttribute("href") || "" };
    });

    /* Nomes acessíveis */
    f.semNome = [];
    Array.prototype.forEach.call(doc.querySelectorAll('button, a[href], [role="button"], [role="link"], summary'), function (el) {
      if (visivel(el, win) && !nomeAcessivel(el, doc)) f.semNome.push(descrever(el));
    });
    f.semNome = unicos(f.semNome);

    var campos = Array.prototype.filter.call(doc.querySelectorAll("input, select, textarea"), function (el) {
      return !/^(hidden|submit|button|reset|image)$/.test(el.type) && visivel(el, win);
    });
    f.semRotulo = [];
    f.soPlaceholder = [];
    campos.forEach(function (el) {
      var n = nomeAcessivel(el, doc);
      if (!n && el.getAttribute("placeholder")) f.soPlaceholder.push(el.getAttribute("placeholder"));
      else if (!n) f.semRotulo.push(descrever(el));
    });
    f.svgSemNome = Array.prototype.filter.call(doc.querySelectorAll('svg[role="img"]'), function (s) {
      return visivel(s, win) && !nomeAcessivel(s, doc);
    }).length;

    /* Imagens */
    f.imagens = Array.prototype.filter.call(doc.images, function (img) { return visivel(img, win); }).map(function (img) {
      var src = img.currentSrc || img.src || "";
      var host = "";
      try { host = new URL(src, doc.baseURI).host; } catch (e) {}
      var r = img.getBoundingClientRect();
      return {
        src: /^data:/.test(src) ? "imagem embutida (" + (img.getAttribute("width") || Math.round(img.getBoundingClientRect().width)) + "px)" : curto(src.split("?")[0].split("/").pop() || src, 40),
        alt: img.hasAttribute("alt") ? img.getAttribute("alt") : null,
        origem: img.getAttribute("data-origem"),
        externa: !!host && host !== win.location.host && !/^data:|^blob:/.test(src),
        grande: r.width >= 48 && r.height >= 48
      };
    });

    /* Teclado */
    f.tabPositivo = doc.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex^="-"])').length;
    f.clicaveisSemFoco = [];
    Array.prototype.forEach.call(doc.body.querySelectorAll("*"), function (el) {
      if (f.clicaveisSemFoco.length >= 8) return;
      if (/^(A|BUTTON|INPUT|SELECT|TEXTAREA|SUMMARY|LABEL|OPTION|HTML|BODY)$/.test(el.tagName)) return;
      if (el.closest("a[href], button, label, summary, [tabindex], select, [contenteditable]")) return;
      /* Itens de lista, menu, abas e grade andam pelas setas, não pelo Tab */
      if (el.closest('[role="listbox"], [role="menu"], [role="menubar"], [role="tablist"], [role="grid"], [role="tree"], [role="radiogroup"]')) return;
      var cs = win.getComputedStyle(el);
      var clicavel = el.hasAttribute("onclick") || (cs.cursor === "pointer" && el.parentElement && win.getComputedStyle(el.parentElement).cursor !== "pointer");
      if (clicavel && visivel(el, win) && !el.hasAttribute("tabindex")) f.clicaveisSemFoco.push(descrever(el) + (el.textContent.trim() ? " \"" + curto(el.textContent, 24) + "\"" : ""));
    });

    /* Formulários e dados pessoais */
    var grupos = Array.prototype.slice.call(doc.forms);
    if (!grupos.length && campos.length) grupos = [doc.body];
    f.formularios = [];
    grupos.forEach(function (g) {
      var dentro = campos.filter(function (c) { return g.contains(c); });
      var pessoais = dentro.filter(function (c) {
        if (/^(search|checkbox|radio|range|color|file)$/.test(c.type)) return false;
        var ac = c.getAttribute("autocomplete") || "";
        return c.type === "email" || c.type === "tel" || /name|email|tel|address|postal|bday/.test(ac) || DADO_PESSOAL.test(rotuloCampo(c, doc) + " " + (c.name || "") + " " + (c.id || ""));
      });
      if (!pessoais.length) return;
      var temLink = Array.prototype.some.call(g.querySelectorAll("a[href]"), function (a) { return /privacidade|privacy/i.test(a.textContent + a.getAttribute("href")); })
        || /pol[ií]tica de privacidade/i.test(g.textContent || "")
        || (g.parentElement && /pol[ií]tica de privacidade/i.test(g.parentElement.textContent || ""));
      var marcados = dentro.filter(function (c) {
        return c.type === "checkbox" && (c.defaultChecked || c.checked) && MARKETING.test(rotuloCampo(c, doc));
      }).map(function (c) { return curto(rotuloCampo(c, doc), 50); });
      f.formularios.push({ nome: g === doc.body ? "Campos da página" : (g.getAttribute("aria-label") || g.id || "Formulário"), campos: pessoais.map(function (c) { return curto(rotuloCampo(c, doc), 30); }), linkPrivacidade: temLink, marketingMarcado: marcados });
    });
    f.sensiveis = [];
    f.soSePrecisar = [];
    campos.forEach(function (c) {
      var r = rotuloCampo(c, doc) + " " + (c.name || "");
      if (SENSIVEIS.test(r)) f.sensiveis.push(curto(rotuloCampo(c, doc), 40));
      else if (SO_SE_PRECISAR.test(r)) f.soSePrecisar.push(curto(rotuloCampo(c, doc), 40));
    });

    /* Rastreamento e consentimento */
    var achados = [];
    var fontes = Array.prototype.map.call(doc.scripts, function (s) { return s.type === "text/plain" ? "" : s.src; });
    try { fontes = fontes.concat(win.performance.getEntriesByType("resource").map(function (e) { return e.name; })); } catch (e) {}
    fontes.forEach(function (u) {
      RASTREADORES.forEach(function (r) { if (u && r[0].test(u)) achados.push(r[1]); });
    });
    Object.keys(GLOBAIS).forEach(function (g) { try { if (win[g]) achados.push(GLOBAIS[g]); } catch (e) {} });
    f.rastreadores = unicos(achados);
    f.cookiesRastreio = unicos((doc.cookie || "").split(";").map(function (c) { return c.split("=")[0].trim(); }).filter(function (n) { return COOKIES_RASTREIO.test(n); }));
    var consent = null;
    try { consent = win.localStorage.getItem("consentimento"); } catch (e) {}
    var cmp = /(^|;\s*)(CookieConsent|OptanonConsent|cookieyes-consent|cmplz_)/.test(doc.cookie || "");
    var banner = doc.querySelector('.yn-consent, #onetrust-banner-sdk, #CybotCookiebotDialog, .cky-consent-container, [class*="cookie" i], [id*="cookie" i], [aria-label*="cookie" i]');
    f.consentimento = consent;
    f.temMecanismo = !!(banner || consent || cmp);
    f.bannerVisivel = !!(banner && visivel(banner, win));
    f.bannerRecusa = banner ? Array.prototype.some.call(banner.querySelectorAll("button, a"), function (b) {
      return /recusar|rejeitar|n[aã]o aceit|somente necess|apenas necess|só necess|essenciais/i.test(b.textContent);
    }) : false;
    f.recusouRastreio = false;
    try { var cj = JSON.parse(consent || "null"); f.recusouRastreio = !!cj && cj.analytics === false && cj.marketing === false; } catch (e) {}

    /* Dados da empresa */
    var t = f.texto;
    f.empresa = {
      cnpj: /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/.test(t),
      cep: /\b\d{5}-?\d{3}\b/.test(t),
      email: /[\w.+-]+@[\w-]+\.[\w.]+/.test(t),
      telefone: /\(?\b\d{2}\)?\s?9?\d{4}-?\d{4}\b/.test(t),
      rodape: !!doc.querySelector(".yn-legal")
    };
    return f;
  }

  /* Contraste: mede os textos visíveis no tema atual */
  function medirContraste(doc, win, tema) {
    var falhas = [], medidos = 0, semMedida = 0;
    var walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || p.closest("script, style, noscript, svg, template")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var vistos = new Set();
    while (walker.nextNode() && medidos < 500) {
      var el = walker.currentNode.parentElement;
      if (vistos.has(el)) continue;
      vistos.add(el);
      if (!visivel(el, win) || el.closest(':disabled, [aria-disabled="true"], [disabled]')) continue;
      var cs = win.getComputedStyle(el);
      var fg = cor(cs.color);
      var op = opacidade(el, win);
      if (fg[3] * op < 0.05) continue;
      var bg = fundo(el, win);
      if (!bg) { semMedida++; continue; }
      medidos++;
      fg[3] = fg[3] * op;
      var r = razao(misturar(fg, bg), bg);
      var px = parseFloat(cs.fontSize), peso = parseInt(cs.fontWeight, 10) || 400;
      var minimo = px >= 24 || (px >= 18.66 && peso >= 700) ? 3 : 4.5;
      if (r < minimo - 0.05) falhas.push({ texto: curto(el.textContent, 40), razao: r, minimo: minimo, tema: tema, onde: descrever(el) });
    }
    return { falhas: falhas, medidos: medidos, semMedida: semMedida };
  }

  /* ---------- Abrir páginas ---------- */
  function abrir(url, largura, esperar) {
    return new Promise(function (resolve) {
      var fr = document.createElement("iframe");
      fr.setAttribute("aria-hidden", "true");
      fr.tabIndex = -1;
      fr.title = "Diagnóstico";
      fr.style.cssText = "position:fixed;top:0;left:0;width:" + largura + "px;height:900px;border:0;opacity:0;pointer-events:none;z-index:-1;";
      var fim = false;
      var tempo = setTimeout(function () { terminar("A página não terminou de abrir em 20 segundos."); }, 20000);
      function terminar(erro) {
        if (fim) return;
        fim = true;
        clearTimeout(tempo);
        resolve({ frame: fr, erro: erro });
      }
      fr.addEventListener("load", function () {
        var doc;
        try { doc = fr.contentDocument; } catch (e) {}
        if (!doc || !doc.body || /^chrome-error|^about:blank/.test(doc.URL || "")) {
          terminar("Não deu para abrir dentro do sistema. Se o servidor manda X-Frame-Options: DENY, troque para SAMEORIGIN (templates/vercel.json).");
          return;
        }
        Promise.resolve(doc.fonts ? doc.fonts.ready : null).then(function () { return espera(esperar); }).then(function () { terminar(null); });
      });
      fr.src = url;
      document.body.appendChild(fr);
    });
  }

  /* ---------- As 17 regras ---------- */
  function sim(v) { return { aplica: true, motivo: v || "" }; }
  function emLista(xs) { return xs.length > 1 ? xs.slice(0, -1).join(", ") + " e " + xs[xs.length - 1] : String(xs[0] || ""); }
  function nao(v) { return { aplica: false, motivo: v }; }

  var REGRAS = [
    {
      id: 1, titulo: "Política de privacidade", grupo: "LGPD",
      vale: function (p) { return p.publico ? sim() : nao("Sistema interno, sem página aberta ao público. A política fica no site da empresa."); },
      resolver: "Página /privacidade com o que é coletado, para quê, com quem é compartilhado, por quanto tempo fica guardado, quem é o encarregado e como pedir acesso ou exclusão. Link no rodapé (.yn-legal) e perto de todo formulário. Modelo: templates/legal/politica-de-privacidade.md.",
      base: "LGPD (Lei 13.709/2018), arts. 6º, 9º e 18.",
      risco: "LGPD: falta de transparência. Sanções da ANPD vão de advertência a multa de até 2% do faturamento (art. 52).",
      testar: function (c) { return linkLegal(c, /privacidade|privacy/i, "fail"); }
    },
    {
      id: 2, titulo: "Termos de serviço", grupo: "Jurídico",
      vale: function (p) { return p.publico || p.vende ? sim() : nao("Sistema interno usado só pela equipe. As regras de uso ficam no contrato de trabalho ou de prestação."); },
      resolver: "Página /termos com quem pode usar, o que é proibido, responsabilidades, cancelamento, foro e data da última atualização. Link no rodapé. Modelo: templates/legal/termos-de-uso.md.",
      base: "Código Civil (contratos) e Código de Defesa do Consumidor (Lei 8.078/1990).",
      risco: "Sem termos, não há regra clara de uso e de responsabilidade em caso de disputa.",
      testar: function (c) { return linkLegal(c, /termos|terms/i, "fail"); }
    },
    {
      id: 3, titulo: "Aviso de cookies", grupo: "LGPD",
      vale: function (p, c) {
        if (!p.publico) return nao("Sistema interno, sem página aberta ao público.");
        return p.rastreamento || c.rastreadores.length ? sim() : nao("Não usa rastreamento nem cookie de terceiros: cookie só de funcionamento (login, tema) dispensa o aviso.");
      },
      resolver: "Aviso .yn-consent na primeira visita, com Recusar e Aceitar do mesmo tamanho e cor, e Configurar. Rastreamento só carrega depois do aceite. Escolha guardada em localStorage \"consentimento\" ({ analytics, marketing, em }). Página /cookies com a lista do que é usado.",
      base: "LGPD, arts. 7º e 8º; Guia de cookies da ANPD (confira a versão atual no site da ANPD).",
      risco: "LGPD: rastrear sem consentimento é tratamento sem base legal.",
      testar: function (c) {
        var a = [], s = "ok";
        if (!c.algum("temMecanismo")) { s = "fail"; a.push("Nenhum aviso de cookies nas páginas testadas."); }
        if (c.algum("cookiesRastreio").length && (!c.algum("consentimento") || c.algum("recusouRastreio"))) {
          s = "fail";
          a.push("Cookie de rastreamento gravado antes do aceite (ou depois de recusar): " + c.algum("cookiesRastreio").join(", ") + ".");
        }
        if (c.algum("bannerVisivel") && !c.algum("bannerRecusa")) {
          s = pior([s, "warn"]);
          a.push("O aviso não tem botão de recusar. Recusar tem que ser tão fácil quanto aceitar.");
        }
        if (s === "ok") a.push("Aviso encontrado. Confira em aba anônima: nada de rastreamento antes de clicar em Aceitar.");
        return { status: s, achados: a };
      }
    },
    {
      id: 4, titulo: "Política de reembolso", grupo: "Consumidor",
      vale: function (p) { return p.vende ? sim() : nao("Não vende nem cobra online."); },
      resolver: "Página /reembolso com o direito de arrependimento de 7 dias em compra online, como pedir troca ou devolução, prazos e quem paga o frete. Link no rodapé e no checkout. Modelo: templates/legal/politica-de-reembolso.md.",
      base: "Código de Defesa do Consumidor, art. 49 (arrependimento em 7 dias); Decreto 7.962/2013.",
      risco: "CDC: o arrependimento de 7 dias vale mesmo sem política escrita; sem informar, a loja responde no Procon e na Justiça.",
      testar: function (c) { return linkLegal(c, /reembolso|troca|devolu[cç]|arrependimento|refund/i, "fail"); }
    },
    {
      id: 5, titulo: "Formulários na LGPD", grupo: "LGPD",
      vale: function (p) {
        if (!p.dadosPessoais) return nao("Não coleta dado pessoal.");
        return p.publico ? sim() : nao("Formulários internos são preenchidos pela equipe. O aceite de marketing do cliente fica registrado no cadastro (docs/06).");
      },
      resolver: "Todo formulário com dado pessoal diz para que serve e tem link para a política de privacidade. Caixa de receber ofertas (e-mail, WhatsApp, SMS) começa desmarcada e é separada do envio.",
      base: "LGPD, arts. 7º, 8º e 9º.",
      risco: "LGPD: consentimento pré-marcado não vale; marketing sem aceite é tratamento sem base legal.",
      testar: function (c) {
        var fs = c.todos("formularios");
        if (!fs.length) return { status: "ok", achados: ["Nenhum formulário com dado pessoal nas páginas testadas. Inclua as páginas de cadastro, contato e checkout na lista."] };
        var a = [], s = "ok";
        fs.forEach(function (f) {
          if (f.marketingMarcado.length) { s = "fail"; a.push(f.pagina + ": caixa de marketing já vem marcada: " + f.marketingMarcado.join(", ") + "."); }
          if (!f.linkPrivacidade) { s = pior([s, "warn"]); a.push(f.pagina + ": \"" + f.nome + "\" pede " + f.campos.join(", ") + " sem link para a política de privacidade."); }
        });
        if (s === "ok") a.push(fs.length + " formulário(s) com link para a política e sem caixa pré-marcada.");
        return { status: s, achados: a };
      }
    },
    {
      id: 6, titulo: "Só dados necessários", grupo: "LGPD",
      vale: function (p) { return p.dadosPessoais ? sim() : nao("Não coleta dado pessoal."); },
      resolver: "Cada campo pessoal tem um motivo (emitir nota, entregar, cobrar). Campo que ninguém usa sai da tela e do banco. Dado sensível (saúde, religião, biometria...) só com base legal específica e acesso restrito.",
      base: "LGPD, art. 6º, III (necessidade) e art. 11 (dados sensíveis).",
      risco: "LGPD: guardar dado sem necessidade aumenta o tamanho do vazamento e a multa.",
      testar: function (c) {
        var sens = unicos(c.todos("sensiveis")), pede = unicos(c.todos("soSePrecisar")), a = [];
        if (sens.length) a.push("Dado sensível pedido: " + sens.join(", ") + ". Precisa de base legal específica e acesso restrito.");
        if (pede.length) a.push("Confirme que precisa de: " + pede.join(", ") + ".");
        a.push("Confira também o banco: coluna que nenhuma tela usa sai.");
        return { status: sens.length ? "warn" : "manual", achados: a };
      }
    },
    {
      id: 7, titulo: "Scripts de tracking", grupo: "LGPD",
      vale: function () { return sim(); },
      resolver: "Liste cada rastreador (Pixel, Analytics, Tag Manager, Hotjar) e para que serve. Carregue só depois do aceite. Sistema interno não rastreia: gravação de tela mostra dado de cliente.",
      base: "LGPD, arts. 7º e 8º.",
      risco: "LGPD: rastreador sem aceite, ou gravando tela com dado de cliente.",
      testar: function (c) {
        var r = unicos(c.todos("rastreadores"));
        if (!r.length) return { status: "ok", achados: ["Nenhum rastreador encontrado nas páginas testadas."] };
        var a = ["Encontrado: " + r.join(", ") + "."];
        if (!c.perfil.publico) return { status: "fail", achados: a.concat(["Sistema interno não deve ter rastreamento: tire o script."]) };
        if (!c.perfil.rastreamento) return { status: "fail", achados: a.concat(["O perfil diz que o sistema não usa rastreamento. Ou tire o script, ou ajuste o perfil e coloque o aviso de cookies."]) };
        a.push("Confira em aba anônima que cada um só carrega depois do aceite.");
        return { status: "warn", achados: a };
      }
    },
    {
      id: 8, titulo: "Acessibilidade", grupo: "Acessibilidade",
      vale: function () { return sim(); },
      resolver: "Idioma no <html lang=\"pt-BR\">, um h1 por tela, todo botão e campo com nome (texto, <label> ou aria-label), texto de 12px ou mais e zoom liberado. Teste as telas principais com o leitor de tela do celular (TalkBack ou VoiceOver).",
      base: "Lei Brasileira de Inclusão (Lei 13.146/2015), art. 63; WCAG 2.2 nível AA.",
      risco: "LBI: site de empresa precisa ser acessível; cliente com deficiência pode reclamar e processar.",
      testar: function (c) {
        var a = [], s = [];
        c.paginas.forEach(function (p) {
          if (!p.lang) { s.push("fail"); a.push(p.url + ": falta lang no <html>."); }
          if (p.h1 !== 1) { s.push("warn"); a.push(p.url + ": " + p.h1 + " títulos h1 (o certo é 1)."); }
          if (p.semNome.length) { s.push("fail"); a.push(p.url + ": botão ou link sem nome: " + p.semNome.slice(0, 5).join(", ") + "."); }
          if (p.semRotulo.length) { s.push("fail"); a.push(p.url + ": campo sem rótulo: " + p.semRotulo.slice(0, 5).join(", ") + "."); }
          if (p.soPlaceholder.length) { s.push("warn"); a.push(p.url + ": campo só com texto de exemplo, sem rótulo: " + p.soPlaceholder.slice(0, 3).join(", ") + "."); }
          if (p.zoomBloqueado) { s.push("fail"); a.push(p.url + ": o zoom está bloqueado no meta viewport."); }
          if (p.svgSemNome) { s.push("warn"); a.push(p.url + ": " + p.svgSemNome + " imagem SVG sem nome."); }
        });
        c.snapshots.forEach(function (p) {
          if (p.textoPequeno.length) { s.push("warn"); a.push(p.url + " em " + p.largura + "px: texto menor que 12px: " + p.textoPequeno.join(", ") + "."); }
        });
        if (!a.length) return { status: "manual", achados: ["Nada errado no automático. Falta o teste com leitor de tela nas telas principais."] };
        return { status: pior(s), achados: unicos(a) };
      }
    },
    {
      id: 9, titulo: "Alt nas imagens", grupo: "Acessibilidade",
      vale: function () { return sim(); },
      resolver: "Toda <img> tem alt: descreve a imagem (\"Camiseta básica preta, frente\") ou fica vazio (alt=\"\") se for só enfeite. Nunca o nome do arquivo.",
      base: "LBI, art. 63; WCAG 2.2, critério 1.1.1.",
      risco: "LBI: imagem sem descrição é conteúdo que quem usa leitor de tela não recebe.",
      testar: function (c) {
        var imgs = c.todas("imagens");
        if (!imgs.length) return { status: "ok", achados: ["Nenhuma imagem nas páginas testadas."] };
        var sem = imgs.filter(function (i) { return i.alt === null; });
        var arquivo = imgs.filter(function (i) { return i.alt && /\.(jpe?g|png|webp|gif|svg)\b|^(imagem|image|foto|img|banner)\s*\d*$/i.test(i.alt.trim()); });
        var a = [];
        if (sem.length) a.push(sem.length + " imagem(ns) sem alt: " + unicos(sem.map(function (i) { return i.pagina + " " + i.src; })).slice(0, 6).join(", ") + ".");
        if (arquivo.length) a.push("Alt que não descreve nada: " + unicos(arquivo.map(function (i) { return "\"" + i.alt + "\""; })).slice(0, 5).join(", ") + ".");
        if (!a.length) a.push(imgs.length + " imagem(ns), todas com alt.");
        return { status: sem.length ? "fail" : arquivo.length ? "warn" : "ok", achados: a };
      }
    },
    {
      id: 10, titulo: "Contraste corrigido", grupo: "Acessibilidade",
      vale: function () { return sim(); },
      resolver: "Texto normal com contraste de 4,5:1 e texto grande (24px, ou 18,66px em negrito) com 3:1, no claro e no escuro. Use os tokens do padrão; para a cor do cliente, use o gerador da vitrine.",
      base: "LBI, art. 63; WCAG 2.2, critério 1.4.3.",
      risco: "LBI: texto ilegível para quem enxerga pouco ou usa o celular no sol.",
      testar: function (c) {
        var f = c.contraste.falhas;
        if (!c.contraste.medidos) return { status: "manual", achados: ["Não deu para medir nenhum texto. Confira na mão."] };
        var a = [];
        if (f.length) {
          var grupos = {};
          f.forEach(function (x) { var k = x.tema + "|" + x.onde; if (!grupos[k]) grupos[k] = x; });
          Object.keys(grupos).slice(0, 8).forEach(function (k) {
            var x = grupos[k];
            a.push("Tema " + x.tema + ", " + x.pagina + ": \"" + x.texto + "\" em " + x.onde + ": " + x.razao.toFixed(1).replace(".", ",") + ":1 (mínimo " + String(x.minimo).replace(".", ",") + ":1).");
          });
        } else a.push(c.contraste.medidos + " textos medidos" + (c.contraste.semTroca ? "" : " no tema claro e no escuro") + ", todos acima do mínimo.");
        if (c.contraste.semMedida) a.push(c.contraste.semMedida + " texto(s) em cima de imagem ou degradê: confira na mão.");
        if (c.contraste.semTroca) a.push("O sistema não troca de tema pelo data-theme do padrão, então só um tema foi medido. Tema claro e escuro é obrigatório: confira o outro na mão.");
        return { status: f.length ? "fail" : c.contraste.semTroca ? "warn" : "ok", achados: a };
      }
    },
    {
      id: 11, titulo: "Navegação por teclado", grupo: "Acessibilidade",
      vale: function () { return sim(); },
      resolver: "Tudo que se clica é <button> ou <a href> (nunca <div onClick>). Tab percorre a tela na ordem de leitura, o foco aparece sempre, Enter e Espaço acionam, Esc fecha janela e menu, e o foco não fica preso.",
      base: "LBI, art. 63; WCAG 2.2, critérios 2.1.1 e 2.4.7.",
      risco: "LBI: quem não usa mouse não consegue usar o sistema.",
      testar: function (c) {
        var a = [], s = "manual";
        c.paginas.forEach(function (p) {
          if (p.clicaveisSemFoco.length) { s = "warn"; a.push(p.url + ": parece clicável mas o Tab não chega: " + p.clicaveisSemFoco.slice(0, 4).join(", ") + "."); }
          if (p.tabPositivo) { s = "warn"; a.push(p.url + ": " + p.tabPositivo + " elemento(s) com tabindex maior que 0 (bagunça a ordem)."); }
        });
        a.push("Teste na mão: Tab do topo ao fim de cada tela principal, abrir e fechar menu e janela só pelo teclado.");
        return { status: s, achados: a };
      }
    },
    {
      id: 12, titulo: "Sem promessas falsas", grupo: "Consumidor",
      vale: function (p) { return p.publico ? sim() : nao("Sistema interno: não tem texto de venda para o público."); },
      resolver: "Tire o que não dá para provar: \"garantido\", \"100%\", \"cura\", \"o melhor do Brasil\", urgência que não é verdade. Produto regulado (cosmético, alimento, saúde) só promete o que o registro permite.",
      base: "Código de Defesa do Consumidor, art. 37 (publicidade enganosa); Código do Conar; regras da Anvisa para produto regulado.",
      risco: "CDC: publicidade enganosa gera multa no Procon, ação e obrigação de cumprir o prometido.",
      testar: function (c) {
        var a = [];
        c.paginas.forEach(function (p) {
          PROMESSAS.forEach(function (r) {
            var m = r[0].exec(p.texto);
            if (m) {
              var i = Math.max(0, m.index - 30);
              a.push(p.url + ": " + r[1] + " em \"" + curto(p.texto.slice(i, m.index + m[0].length + 30), 80) + "\".");
            }
          });
        });
        if (!a.length) return { status: "ok", achados: ["Nada suspeito no texto das páginas testadas. Anúncios e posts ficam fora deste teste."] };
        a.push("Cada item acima precisa de prova ou sai do texto.");
        return { status: "warn", achados: unicos(a).slice(0, 10) };
      }
    },
    {
      id: 13, titulo: "Copyright das imagens", grupo: "Jurídico",
      vale: function (p) { return p.publico ? sim() : nao("Sistema interno: as imagens são do próprio cliente (produtos, logo)."); },
      resolver: "Registre a origem de cada imagem no próprio <img>: data-origem=\"propria\", \"cliente\", \"banco:Nome do banco\" ou \"licenca:CC-BY Autor\". Nada copiado do Google, de concorrente ou de rede social.",
      base: "Lei de Direitos Autorais (Lei 9.610/1998).",
      risco: "Lei 9.610: uso de imagem sem licença gera notificação, retirada e indenização.",
      testar: function (c) {
        var imgs = c.todas("imagens").filter(function (i) { return i.grande; });
        if (!imgs.length) return { status: "ok", achados: ["Nenhuma foto ou ilustração nas páginas testadas."] };
        var sem = imgs.filter(function (i) { return !i.origem; });
        var fora = sem.filter(function (i) { return i.externa; });
        var a = [];
        if (fora.length) a.push("Imagem puxada de outro site, sem origem registrada: " + unicos(fora.map(function (i) { return i.src; })).slice(0, 5).join(", ") + ".");
        if (sem.length) a.push(sem.length + " de " + imgs.length + " imagem(ns) sem data-origem. Confira a licença de cada uma.");
        else a.push(imgs.length + " imagem(ns), todas com origem registrada.");
        return { status: fora.length ? "warn" : sem.length ? "manual" : "ok", achados: a };
      }
    },
    {
      id: 14, titulo: "Dados da empresa", grupo: "Consumidor",
      vale: function (p) { return p.publico ? sim() : nao("Sistema interno: quem usa já conhece a empresa."); },
      resolver: "Rodapé .yn-legal em toda página pública com razão social, CNPJ, endereço, e-mail e telefone de contato.",
      base: "Decreto 7.962/2013 (comércio eletrônico), art. 2º; Código de Defesa do Consumidor.",
      risco: "Decreto 7.962: loja online sem identificação completa é infração ao CDC.",
      testar: function (c) {
        var e = { cnpj: false, cep: false, email: false, telefone: false };
        c.paginas.forEach(function (p) { Object.keys(e).forEach(function (k) { e[k] = e[k] || p.empresa[k]; }); });
        var falta = [];
        if (!e.cnpj) falta.push("CNPJ");
        if (!e.cep) falta.push("endereço com CEP");
        if (!e.email) falta.push("e-mail");
        if (!e.telefone) falta.push("telefone");
        if (!falta.length) return { status: "ok", achados: ["CNPJ, endereço, e-mail e telefone encontrados."] };
        return { status: !e.cnpj && c.perfil.vende ? "fail" : "warn", achados: ["Não encontrado nas páginas testadas: " + falta.join(", ") + "."] };
      }
    },
    {
      id: 15, titulo: "Conformidade LGPD", grupo: "LGPD",
      vale: function (p) { return p.dadosPessoais ? sim() : nao("Não guarda dado pessoal."); },
      resolver: "Feche os itens da lista abaixo e registre onde está cada um (docs/06-seguranca-lgpd.md do padrão).",
      base: "LGPD, arts. 6º, 18, 37, 41, 46 e 48; Marco Civil da Internet (Lei 12.965/2014), art. 15.",
      risco: "LGPD: sem encarregado, sem canal do titular e sem plano de incidente, qualquer reclamação vira problema na ANPD.",
      testar: function () {
        return {
          status: "manual",
          achados: [
            "Encarregado (DPO) com nome e e-mail publicados na política de privacidade.",
            "Canal para o titular pedir acesso, correção, exclusão e portabilidade, respondido dentro do prazo da lei.",
            "Base legal anotada para cada dado (contrato, obrigação legal, consentimento ou legítimo interesse).",
            "Prazo de guarda e de exclusão definido para cada dado.",
            "RLS por papel e por dono testada pela API com um usuário de cada papel.",
            "Contrato com cada operador (banco, hospedagem, WhatsApp, ERP) e onde os dados ficam guardados.",
            "Plano de incidente: quem avisa a ANPD e os titulares, e em quanto tempo.",
            "Registros de acesso guardados por 6 meses, se o sistema é oferecido ao público com fins econômicos."
          ]
        };
      }
    },
    {
      id: 16, titulo: "Riscos jurídicos", grupo: "Jurídico",
      vale: function () { return sim(); },
      resolver: "Comece pelos itens em vermelho. Leve a lista a um advogado antes de publicar ou de mudar o que coleta.",
      base: "Resumo dos itens acima. Alerta técnico, não é parecer jurídico.",
      testar: function () { return { status: "ok", achados: [] }; }
    },
    {
      id: 17, titulo: "Responsivo ao espaço disponível", grupo: "Responsivo",
      vale: function () { return sim(); },
      resolver: "Nada de rolagem lateral na página. Tela de trabalho (lista, quadro, tabela, mensagens) usa a largura toda (.yn-content); formulário e texto usam .yn-content--narrow. Componente que mora em painel estreito fica dentro de .yn-container para se ajustar ao espaço dele.",
      base: "Padrão Yan Nunes, docs/02-visual.md (Responsivo); WCAG 2.2, critério 1.4.10 (refluxo).",
      risco: "Tela que corta no celular ou desperdiça metade do monitor: retrabalho e reclamação de quem usa.",
      testar: function (c) {
        var a = [], s = "ok";
        c.snapshots.forEach(function (p) {
          if (p.overflow) { s = "fail"; a.push(p.url + " em " + p.largura + "px: a página rola de lado" + (p.culpados.length ? " (" + p.culpados.join(", ") + ")" : "") + "."); }
          if (p.espaco && !p.espaco.estreito && p.espaco.trabalho && p.espaco.uso < 0.8) {
            s = pior([s, "warn"]);
            a.push(p.url + " em " + p.largura + "px: a tela usa " + Math.round(p.espaco.uso * 100) + "% do espaço" + (p.espaco.rolaComEspaco ? " e ainda rola de lado num quadro ou tabela" : "") + ".");
          } else if (p.espaco && !p.espaco.estreito && p.espaco.rolaComEspaco) {
            s = pior([s, "warn"]);
            a.push(p.url + " em " + p.largura + "px: um quadro ou tabela rola de lado com espaço sobrando na tela.");
          }
        });
        if (s === "ok") a.push("Sem rolagem lateral em " + emLista(c.larguras) + "px, e a tela usa o espaço que tem.");
        a.push("Toque de 44px: confira no celular de verdade ou no modo dispositivo do navegador.");
        return { status: s, achados: a };
      }
    }
  ];

  function linkLegal(c, re, falha) {
    var onde = [];
    c.paginas.forEach(function (p) {
      if (p.links.some(function (l) { return re.test(l.texto) || re.test(l.href); })) onde.push(p.url);
    });
    if (onde.length) return { status: "ok", achados: ["Link encontrado em " + unicos(onde).join(", ") + ". Confira se o texto está atualizado e tem data."] };
    return { status: falha, achados: ["Nenhum link nas páginas testadas. Ele fica no rodapé de toda página pública (.yn-legal)."] };
  }

  /* ---------- Rodar ---------- */
  function rodar(opcoes) {
    opcoes = opcoes || {};
    var perfil = Object.assign({ publico: false, vende: false, rastreamento: false, dadosPessoais: true }, opcoes.perfil || {});
    var paginas = opcoes.paginas && opcoes.paginas.length ? opcoes.paginas : ["/"];
    var larguras = (opcoes.larguras && opcoes.larguras.length ? opcoes.larguras : [375, 1280, 1920]).slice().sort(function (a, b) { return a - b; });
    var esperar = opcoes.esperar == null ? 1500 : opcoes.esperar;
    var aviso = opcoes.onProgresso || function () {};
    var maior = larguras[larguras.length - 1];
    var snapshots = [], completos = [], erros = [], contraste = { falhas: [], medidos: 0, semMedida: 0 };
    var inicio = new Date();

    var fila = [];
    paginas.forEach(function (url) { larguras.forEach(function (l) { fila.push([url, l]); }); });

    return fila.reduce(function (p, item, i) {
      return p.then(function () {
        var url = item[0], largura = item[1], completo = largura === maior;
        aviso("Abrindo " + url + " em " + largura + "px (" + (i + 1) + " de " + fila.length + ")");
        return abrir(url, largura, esperar).then(function (r) {
          if (r.erro) { erros.push(url + ": " + r.erro); r.frame.remove(); return; }
          var doc = r.frame.contentDocument, win = r.frame.contentWindow;
          var f = coletar(doc, win, largura, url, completo);
          snapshots.push(f);
          if (!completo) { r.frame.remove(); return; }
          completos.push(f);
          var raiz = doc.documentElement;
          var antes = raiz.getAttribute("data-theme");
          var escuro = antes ? antes === "dark" : win.matchMedia("(prefers-color-scheme: dark)").matches;
          var m1 = medirContraste(doc, win, escuro ? "escuro" : "claro");
          var fundoAntes = win.getComputedStyle(doc.body).backgroundColor;
          raiz.setAttribute("data-theme", escuro ? "light" : "dark");
          return espera(150).then(function () {
            /* Só mede o outro tema se o sistema troca de tema pelo data-theme do padrão */
            var trocou = win.getComputedStyle(doc.body).backgroundColor !== fundoAntes;
            var m2 = trocou ? medirContraste(doc, win, escuro ? "claro" : "escuro") : { falhas: [], medidos: 0, semMedida: 0 };
            if (!trocou) contraste.semTroca = true;
            if (antes === null) raiz.removeAttribute("data-theme"); else raiz.setAttribute("data-theme", antes);
            [m1, m2].forEach(function (m) {
              m.falhas.forEach(function (x) { x.pagina = url; contraste.falhas.push(x); });
              contraste.medidos += m.medidos;
              contraste.semMedida += m.semMedida;
            });
            r.frame.remove();
          });
        }).catch(function (e) { erros.push(url + ": " + (e && e.message ? e.message : e)); });
      });
    }, Promise.resolve()).then(function () {
      aviso("");
      var ctx = {
        perfil: perfil, larguras: larguras, snapshots: snapshots, paginas: completos, contraste: contraste,
        rastreadores: unicos([].concat.apply([], completos.map(function (p) { return p.rastreadores; }))),
        algum: function (chave) {
          var v = completos.map(function (p) { return p[chave]; });
          if (Array.isArray(v[0])) return unicos([].concat.apply([], v));
          return v.some(Boolean) ? v.filter(Boolean)[0] : false;
        },
        todos: function (chave) {
          return [].concat.apply([], completos.map(function (p) { return (p[chave] || []).map(function (x) { if (x && typeof x === "object") x.pagina = p.url; return x; }); }));
        },
        todas: function (chave) { return ctx.todos(chave); }
      };
      var resultados = REGRAS.map(function (r) {
        var v = r.vale(perfil, ctx);
        if (!v.aplica) return { id: r.id, titulo: r.titulo, grupo: r.grupo, status: "na", achados: [v.motivo], resolver: r.resolver, base: r.base };
        if (!completos.length) return { id: r.id, titulo: r.titulo, grupo: r.grupo, status: "manual", achados: ["Nenhuma página abriu. Confira a lista de páginas."], resolver: r.resolver, base: r.base };
        var t;
        try { t = r.testar(ctx); } catch (e) { t = { status: "manual", achados: ["O teste não rodou: " + (e && e.message ? e.message : e) + ". Confira na mão."] }; }
        return { id: r.id, titulo: r.titulo, grupo: r.grupo, status: t.status, achados: t.achados, resolver: r.resolver, base: r.base, risco: r.risco };
      });
      var riscos = resultados.filter(function (r) { return r.id !== 16 && (r.status === "fail" || r.status === "warn") && r.risco; });
      var r16 = resultados[15];
      r16.status = riscos.length ? pior(riscos.map(function (r) { return r.status; })) : "ok";
      r16.achados = riscos.length
        ? riscos.map(function (r) { return (r.status === "fail" ? "Alto" : "Médio") + " · " + r.id + ". " + r.titulo + ": " + r.risco; })
        : ["Nenhum risco aberto nos itens testados automaticamente. Os itens \"Conferir\" ainda dependem de você."];
      r16.achados.push("Alerta técnico, não é parecer jurídico.");
      var contagem = { fail: 0, warn: 0, manual: 0, ok: 0, na: 0 };
      resultados.forEach(function (r) { contagem[r.status]++; });
      return {
        versao: VERSAO, data: inicio, perfil: perfil, paginas: paginas, larguras: larguras,
        erros: erros, contagem: contagem, resultados: resultados,
        sistema: document.title
      };
    });
  }

  /* ---------- Relatório em texto (para colar no chat ou no WhatsApp do suporte) ---------- */
  function sn(v) { return v ? "sim" : "não"; }

  function relatorio(r) {
    var l = [];
    l.push("Diagnóstico — Padrão Yan Nunes v" + r.versao);
    l.push((r.sistema || "Sistema") + " · " + r.data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }));
    l.push("Perfil: página pública " + sn(r.perfil.publico) + " · vende online " + sn(r.perfil.vende) + " · rastreamento " + sn(r.perfil.rastreamento) + " · dados pessoais " + sn(r.perfil.dadosPessoais));
    l.push("Páginas: " + r.paginas.join(", ") + " · larguras: " + r.larguras.join(", ") + "px");
    l.push("Resumo: " + r.contagem.fail + " falhou · " + r.contagem.warn + " atenção · " + r.contagem.manual + " conferir · " + r.contagem.ok + " ok · " + r.contagem.na + " não se aplica");
    if (r.erros.length) l.push("Páginas com erro: " + r.erros.join(" | "));
    l.push("");
    r.resultados.forEach(function (x) {
      l.push("[" + STATUS[x.status].rotulo.toUpperCase() + "] " + x.id + ". " + x.titulo);
      x.achados.forEach(function (a) { l.push("  - " + a); });
      if (x.status === "fail" || x.status === "warn") l.push("  Como resolver: " + x.resolver);
    });
    return l.join("\n");
  }

  /* ---------- A aba Diagnóstico ---------- */
  function montar(el, opcoes) {
    opcoes = opcoes || {};
    var perfil = Object.assign({ publico: false, vende: false, rastreamento: false, dadosPessoais: true }, opcoes.perfil || {});
    var ultimo = null;
    el.classList.add("yn-audit");
    el.innerHTML =
      '<div class="yn-audit__head">' +
        '<div><p class="yn-eyebrow">Diagnóstico · padrão v' + VERSAO + '</p>' +
        '<p class="yn-audit__when" data-quando>Ainda não rodou. Leva alguns segundos por página.</p>' +
        '<div class="yn-audit__profile">' +
          '<span class="yn-chip">Página pública: ' + sn(perfil.publico) + '</span>' +
          '<span class="yn-chip">Vende online: ' + sn(perfil.vende) + '</span>' +
          '<span class="yn-chip">Rastreamento: ' + sn(perfil.rastreamento) + '</span>' +
          '<span class="yn-chip">Dados pessoais: ' + sn(perfil.dadosPessoais) + '</span>' +
        '</div></div>' +
        '<div class="yn-audit__actions">' +
          '<button class="yn-btn yn-btn--secondary" type="button" data-copiar disabled>' + icone("copy") + 'Copiar relatório</button>' +
          '<button class="yn-btn yn-btn--primary" type="button" data-rodar>' + icone("play") + 'Rodar diagnóstico</button>' +
        '</div>' +
      '</div>' +
      '<p class="yn-audit__progress" data-progresso hidden><span class="yn-spinner" aria-hidden="true"></span><span></span></p>' +
      '<div class="yn-audit__summary" data-resumo hidden></div>' +
      '<ol class="yn-audit__list" data-lista aria-live="polite"></ol>';

    var bRodar = el.querySelector("[data-rodar]"), bCopiar = el.querySelector("[data-copiar]");
    var prog = el.querySelector("[data-progresso]"), resumo = el.querySelector("[data-resumo]"), lista = el.querySelector("[data-lista]");

    function desenhar(r) {
      ultimo = r;
      el.querySelector("[data-quando]").textContent = "Rodou em " + r.data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }) +
        " · " + r.paginas.length + " página(s) · " + emLista(r.larguras) + "px" + (r.erros.length ? " · " + r.erros.length + " com erro" : "");
      resumo.hidden = false;
      resumo.innerHTML = ["fail", "warn", "manual", "ok", "na"].map(function (s) {
        return '<div class="yn-audit__count" data-status="' + s + '"><strong>' + r.contagem[s] + "</strong>" + STATUS[s].rotulo + "</div>";
      }).join("");
      var ordem = r.resultados.slice().sort(function (a, b) { return STATUS[b.status].peso - STATUS[a.status].peso || a.id - b.id; });
      var abertos = 0;
      lista.innerHTML = (r.erros.length ? '<li><div class="yn-alert" data-tone="warning" role="status"><div><strong class="yn-alert__title">Páginas que não abriram</strong>' + r.erros.map(esc).join("<br>") + "</div></div></li>" : "") +
        ordem.map(function (x) {
          var st = STATUS[x.status];
          var abrir = x.status === "fail" && abertos++ < 3;
          return '<li><details class="yn-audit__item" data-status="' + x.status + '"' + (abrir ? " open" : "") + ">" +
            "<summary>" +
              '<span class="yn-audit__icon">' + icone(x.status) + "</span>" +
              '<span class="yn-audit__name"><span class="yn-audit__title">' + x.id + ". " + esc(x.titulo) + '</span><span class="yn-audit__meta">' + esc(x.grupo) + "</span></span>" +
              '<span class="yn-badge"' + (st.tom ? ' data-tone="' + st.tom + '"' : "") + ">" + st.rotulo + "</span>" +
            "</summary>" +
            '<div class="yn-audit__body">' +
              '<ul class="yn-audit__findings">' + x.achados.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" +
              (x.status !== "na" ? '<p class="yn-audit__fix"><strong>Como resolver:</strong> ' + esc(x.resolver) + "</p>" : "") +
              '<p class="yn-audit__ref">Base: ' + esc(x.base) + "</p>" +
            "</div></details></li>";
        }).join("");
      bCopiar.disabled = false;
    }

    bRodar.addEventListener("click", function () {
      bRodar.disabled = true;
      bRodar.setAttribute("aria-busy", "true");
      prog.hidden = false;
      rodar(Object.assign({}, opcoes, {
        perfil: perfil,
        onProgresso: function (t) { prog.lastChild.textContent = t; if (opcoes.onProgresso) opcoes.onProgresso(t); }
      })).then(function (r) {
        desenhar(r);
        if (opcoes.aoTerminar) opcoes.aoTerminar(r);
      }).catch(function (e) {
        lista.innerHTML = '<li><div class="yn-alert" data-tone="danger" role="alert"><div><strong class="yn-alert__title">O diagnóstico não terminou</strong>' + esc(e && e.message ? e.message : e) + "</div></div></li>";
      }).then(function () {
        bRodar.disabled = false;
        bRodar.removeAttribute("aria-busy");
        prog.hidden = true;
      });
    });

    bCopiar.addEventListener("click", function () {
      if (!ultimo) return;
      var texto = relatorio(ultimo);
      var feito = function () { bCopiar.lastChild.textContent = "Copiado"; setTimeout(function () { bCopiar.lastChild.textContent = "Copiar relatório"; }, 2000); };
      try { navigator.clipboard.writeText(texto).then(feito, function () { window.prompt("Copie o relatório:", texto); }); }
      catch (e) { window.prompt("Copie o relatório:", texto); }
    });

    if (opcoes.rodarAoAbrir) bRodar.click();
    return { rodar: function () { bRodar.click(); }, ultimo: function () { return ultimo; } };
  }

  global.YNDiagnostico = { versao: VERSAO, regras: REGRAS, rodar: rodar, relatorio: relatorio, montar: montar };
})(typeof window !== "undefined" ? window : this);
