import axios from "axios";
import { useEffect } from "react";

function App() {
  const uniqueButton = document.createElement("div");
  uniqueButton.classList.add("mi-tooltip");
  let selectionTimeout: any = null;

  function getSelectionText() {
    let text :any = "";
    if (window.getSelection) {
      text = window.getSelection()?.toString()
    } 
    return text;
  }

  useEffect(()=>{
      document.addEventListener("mousedown", function () {
        clearTimeout(selectionTimeout);
      });
    document.addEventListener("mouseup", function (event) {
      const text = getSelectionText();
      if (text) {
        console.log('text',text)
        axios.get(`http://localhost:3000/Summerize?text=${text}`).then((data:any)=>{
          console.log('data>?????',data)
          console.log('data',data?.data?.choices)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          selectionTimeout = setTimeout(function () {
            const selection: any = window?.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
      
            document.body.appendChild(uniqueButton);
            uniqueButton.classList.add("show");
            uniqueButton.style.display = "block";
    
             uniqueButton.style.top =
        rect.bottom + 6 + window.pageYOffset - uniqueButton.offsetHeight + "px";
      uniqueButton.style.left = rect.right + window.scrollX + "px";
            // uniqueButton.style.top =
            //   rect.top - 8 + window.pageYOffset - uniqueButton.offsetHeight + "px";
            // uniqueButton.style.left =
            //   rect.left +
            //   window.pageXOffset -
            //   uniqueButton.offsetWidth / 2 +
            //   rect.width / 2 +
            //   "px";
            uniqueButton.style.background = "white";
            uniqueButton.innerText = data?.data?.choices[0]?.text
          }, 250);
        })
      }
    });
    document.addEventListener("click", function (event) {
      if(uniqueButton.classList.contains('show')){
        console.log("true1")
        uniqueButton.classList.remove('show')
      } 
    });

    // chrome?.tabs?.query({
    //   active: true,
    //   currentWindow: true
    // }, tabs => {
    //   /**
    //    * Sends a single message to the content script(s) in the specified tab,
    //    * with an optional callback to run when a response is sent back.
    //    *
    //    * The runtime.onMessage event is fired in each content script running
    //    * in the specified tab for the current extension.
    //    */
    //   chrome.tabs.sendMessage(
    //     tabs[0].id || 0,
    //     { type: 'GET_DOM' },
    //     (response:any) => {
    //       // setTitle(response.title);
    //       // setHeadlines(response.headlines);
    //     });
    // });
    
  })

  return(
    <></>
  )
  // return (
  //   <div>
  //     <header>
  //       <h2>Hello From React App 👋</h2>
  //     </header>
  //   </div>
  // );
}

export default App;