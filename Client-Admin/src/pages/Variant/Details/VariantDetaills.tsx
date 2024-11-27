import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './VariantDetails.scss'
import ImageVariantDetails from './ImageVariantDetails';
import FormVariantDetails from './FormVariantDetails';

const VariantDetaills = () => {
  const { idVariant } = useParams<{ idVariant: string }>();
  const [activeTab, setActiveTab] = useState<string>("tab1")

  const handleActiveTab = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.id)
  }

  return (
    <div className='my-tab' >

      <div className="page">
        <h1>Tên sản phẩm</h1>


        <div className="pcss3t pcss3t-effect-scale pcss3t-theme-6 shadow">
          <input type="radio"
            checked={activeTab === "tab1"}
            onChange={e => handleActiveTab(e)} name="pcss3t" id="tab1" className="tab-content-first" />
          <label htmlFor="tab1"><i className="icon-bolt"></i>Image Variant</label>

          <input type="radio" name="pcss3t" id="tab2"
            checked={activeTab === "tab2"}
            onChange={e => handleActiveTab(e)}
            value="tab2" className="tab-content-2" />
          <label htmlFor="tab2"><i className="icon-picture"></i>General Information</label>


          <div style={{ height: "32px" }} ></div>

          {
            idVariant ?
              (
                <ul>
                  <li className="tab-content tab-content-first typography" style={{ minHeight: "1000px" }} >
                    <ImageVariantDetails id={idVariant} />
                    <div style={{ width: "200px" }} ></div>
                  </li>

                  <li className="tab-content tab-content-2 typography" style={{ minHeight: "1000px" }} >
                    <FormVariantDetails idVariant={Number(idVariant)} />
                  </li>
                </ul>
              ) : (<h1>Variant Not Available</h1>)
            }
        </div>
      </div>
    </div>
  )
}

export default VariantDetaills
