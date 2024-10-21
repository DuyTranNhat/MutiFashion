import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './VariantDetails.scss'
import  ImageVariantDetails from './ImageVariantDetails';

const VariantDetaills = () => {
  const { idVariant } = useParams<{ idVariant: string }>();
  const [activeTab, setActiveTab] = useState<string>("tab1")

  useEffect(() => {

  }, [])

  const handleActiveTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.id)
  }

  return (
    <div className='my-tab' >

      <div className="page">
        <h1>Tên sản phẩm</h1>


        <div className="pcss3t pcss3t-effect-scale pcss3t-theme-4">
          <input type="radio"
            checked={activeTab === "tab1"}
            onChange={e => handleActiveTab(e)} name="pcss3t" id="tab1" className="tab-content-first" />
          <label htmlFor="tab1"><i className="icon-bolt"></i>Image Variant</label>

          <input type="radio" name="pcss3t" id="tab2"
            checked={activeTab === "tab2"}
            onChange={e => handleActiveTab(e)}
            value="tab2" className="tab-content-2" />
          <label htmlFor="tab2"><i className="icon-picture"></i>General Information</label>

          <input type="radio" name="pcss3t" id="tab3"
            onChange={e => handleActiveTab(e)}
            checked={activeTab === "tab3"}
            className="tab-content-3" />
          <label htmlFor="tab3"><i className="icon-cogs"></i>TAB3</label>

          <input type="radio" name="pcss3t" id="tab5" className="tab-content-last" />
          <label htmlFor="tab5"><i className="icon-globe"></i>TAB4</label>

          <div style={{height: "32px"}} ></div>

          <ul>
            <li className="tab-content tab-content-first typography" style={{minHeight: "1000px"}} >
              <ImageVariantDetails id={idVariant ?? ""}  />
              <div style={{width: "200px"}} ></div>
              <p className="text-right"><em>Find out more about Nikola Tesla from <a href="http://en.wikipedia.org/wiki/Nikola_Tesla" target="_blank">Wikipedia</a>.</em></p>
            </li>

            <li className="tab-content tab-content-2 typography" style={{minHeight: "1000px"}} >
              <h1>Albert Einstein</h1>
              <p className="text-right"><em>Find out more about Leonardo da Vinci from <a href="http://en.wikipedia.org/wiki/Leonardo_da_Vinci" target="_blank">Wikipedia</a>.</em></p>
            </li>

            <li className="tab-content tab-content-3 typography" style={{minHeight: "1000px"}} >
              <h1>Albert Einstein</h1>
             <p className="text-right"><em>Find out more about Albert Einstein from <a href="http://en.wikipedia.org/wiki/Albert_Einstein" target="_blank">Wikipedia</a>.</em></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VariantDetaills
