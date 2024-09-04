(function () {
  function getReferrer() {
    return encodeURIComponent(document.referrer || "");
  }

  function getScriptParams() {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      const collectionIndex = script.getAttribute("data-collection-index");
      const providerId = script.getAttribute("data-provider-id");
      if (collectionIndex && providerId) {
        return { collectionIndex, providerId };
      }
    }
    return { collectionIndex: null, providerId: null };
  }

  function getElementInfo(element) {
    return {
      id: element.id || "",
      classes: Array.from(element.classList).join(" ") || "",
      text: element.textContent || element.innerText || "",
    };
  }

  function CerthisTrack({ eventType, click, wallet, sign_message }) {
    const referrer = getReferrer();
    const { collectionIndex, providerId } = getScriptParams();

    if (!collectionIndex || !providerId) {
      console.error(
        "Missing required parameters: collection_index or provider"
      );
      return;
    }

    let params = {};

    if (eventType != null && eventType != undefined) {
      params.event = eventType;
    }

    if (click != null && click != undefined) {
      params.click = JSON.stringify(click);
    }

    if (wallet != null && wallet != undefined) {
      params.wallet = wallet;
    }

    if (sign_message != null && sign_message != undefined) {
      params.sign_message = sign_message;
    }

    const apiUrl = `https://api.certhis.io/track?${new URLSearchParams({
      collection_index: collectionIndex,
      provider: providerId,
      referer: referrer,
      ...params,
    }).toString()}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log("Tracking successful:", data))
      .catch((error) => console.error("Tracking error:", error));
  }
  document.addEventListener("click", function (event) {
    const elementInfo = getElementInfo(event.target);
    CerthisTrack({
      eventType: "click",
      click: elementInfo,
    });
  });

  CerthisTrack({
    eventType: "pageview",
  });
})();
