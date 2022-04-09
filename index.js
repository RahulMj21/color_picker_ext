const btnPicker = document.querySelector(".btn-picker");
const colorsContainer = document.querySelector(".colors-container");

btnPicker.addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (results) => {
      const [data] = results;
      const colorElem = document.createElement("div");
      colorElem.classList.add("single-color");
      colorElem.innerHTML = `
                    <div class="color" style="background: ${data.result.sRGBHex}"></div>
                    <div class="hex">${data.result.sRGBHex}</div>
                    `;
      colorsContainer.appendChild(colorElem);
    }
  );
});

async function pickColor() {
  try {
    const eyeDropper = await new EyeDropper();
    return eyeDropper.open();
  } catch (error) {
    console.error(error);
  }
}
