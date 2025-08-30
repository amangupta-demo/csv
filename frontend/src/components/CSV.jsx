import { useState } from 'react'

import './App.css'
import { useCSVReader } from 'react-papaparse';

function CSV(  ) {
  const { CSVReader } = useCSVReader();
  const [count, setCount] = useState(0)

 return (<>

<CSVReader  
        onUploadAccepted={(results) => {
        console.log('---------------------------');
        console.log(results);
        console.log('---------------------------');
      }} >

{({ getRootProps, acceptedFile, getRemoveFileProps }) => (
        <>
          <div >
            {/* style={styles.csvReader} */}
            {/* style={styles.browseFile} */}
            <button type="button" {...getRootProps()} >
              Browse file
            </button>
            <div >
              {/* style={styles.acceptedFile} */}
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} >
              {/* style={styles.remove} */}
              Remove
            </button>
          </div>
          {/* <ProgressBar style={styles.progressBarBackgroundColor} /> */}
        </>
      )}
</CSVReader>

 </>)
}

export default CSV
