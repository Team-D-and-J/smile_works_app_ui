const page = () => {
  return <>
  <div className="treatment-grid">
          <button>Dental Restoration</button>
          <button>Invisalign</button>
          <button id="tooth-extractions">Tooth Extractions</button>
          <button>Complete Exams</button>
          <button>Veneer</button>
          <button>Crown</button>
          <button>Teeth Whitening</button>
          <button>Mouthguard</button>
          <button>Dental Bonding</button>
          <button>Bridge</button>
          <button>placeholder1</button>
          <button>placeholder2</button>
        </div>
        
        <div id="pdf-modal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <iframe id="pdf-frame" src="" frameborder="0"></iframe>
          </div>
        </div>
	
        </>
export default page;
