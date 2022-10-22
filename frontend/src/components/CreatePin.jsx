import {useState} from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import {MdDelete} from 'react-icons/md'
import {useNavigate} from "react-router-dom"
import {client} from "../client"
import Spinner from "./Spinner"
import {categories} from "../utils/data"

const CreatePin = ({user}) => {
const[title,setTitle]=useState('')
const [about, setAbout] = useState('')
const [destination, setDestination] = useState('')
const [loading, setLoading] = useState(false)
const [fields, setFields] = useState(false)
const [category, setCategory] = useState(null)
const [imageAsset, setImageAsset] = useState(null)
const [wrongImageType, setWrongImageType] = useState(false)
const navigate=useNavigate()

const uploadImage = (e) => {
  const selectedFile = e.target.files[0];
  // uploading asset to sanity
  if (
    selectedFile.type === "image/png" ||
    selectedFile.type === "image/svg" ||
    selectedFile.type === "image/jpeg" ||
    selectedFile.type === "image/gif" ||
    selectedFile.type === "image/tiff"
  ) {
    setWrongImageType(false);
    setLoading(true);
    client.assets
      .upload("image", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((document) => {
        setImageAsset(document);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  } else {
    setLoading(false);
    setWrongImageType(true);
  }
};

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in animate-pulse">
          Please Fill All Fields!
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full ">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items- flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong Image Type!</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col justify-center item-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-6xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to Upload</p>
                  </div>
                  <p className="mt-32 text-gray-400 text-base mx-auto justify-center items-center">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF less than 20MB
                  </p>
                </div>
                <input
                type="file"
                name='upload-image'
                onChange={uploadImage}
                className="w-0 h-0"
               />
              </label>
            ) : (
              <div className='relative h-full '>
                <img src={imageAsset?.url}  alt="upload-pic" className='h-full w-full' />
                <button className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none
                hover:shadow-md transition-all duration-500 ease-in-out' 
                 type='button'
                 onClick={()=>setImageAsset(null)}>
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePin