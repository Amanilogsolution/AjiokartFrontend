import React, { useEffect, useState } from 'react';
import PageLayout from '../../HOC/PageLayout';
import './Faqs.scss';
import { Accordion, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import axios from "axios";
import SeoTags from "../../Components/SEOTags/SeoTags"
import { SITEURL, FAQTITLE, FAQDESC } from '../../cons';
const jsonLdProps = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": `${SITEURL}`,
        "logo": `${SITEURL}/icons/logo.png`
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": `Sellers Home`,
                "item": `${SITEURL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": `Frequntly asked questions`,
                "item": `${window.location.href}`
            }
        ]
    }
]
const seoTags = {
    "pageTitle": `${FAQTITLE}`,
    "PageMetaTitle": ` ${FAQTITLE}`,
    "pageMetaDesc": `${FAQDESC}`,
    pageType: "page",
    pageUrl: `${window.location.href}`,
    pageImage: `${SITEURL}/icons/logo512.png`

}
const FAQs = (props) => {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get("/json/faqs.json").then((res) => {
            console.log(res)
            setData(res.data.data)
        })
    }, [])



    useEffect(() => {
    
        window.scrollTo(0, 0);
        let toItem = document.getElementById(props.location.hash.replace("#", ""));
        if (toItem) {
            window.scrollTo(0, (toItem.offsetTop + 100));
        }

    }, [props.location.hash])

    return (
        <React.Fragment>
            <SeoTags seoData={seoTags} jsonLdProps={jsonLdProps} />
            <div className="faqs">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col col-12">
                            <h1 className="text-center">Frequently asked questions by online sellers</h1>
                        </div>
                        <div className="col col-12 col-md-3">
                            <ul className="list-group quicknav">
                                {data && data.map((value, index) => {
                                    return <li className="list-group-item" key={index}><a href={"/sellers-faq#section-" + index}>{value.faqTitle}</a></li>
                                }
                                )}
                            </ul>

                        </div>
                        <div className="col col-12 col-md-9">



                            {data && data.map((value, index) => {
                                return <div className="accordian-wrap" id={"section-" + index} key={index}><h2 >{value.faqTitle}</h2>
                                    <Accordion>

                                        {value.faqs && value.faqs.map((val, ind) => {
                                            return <Accordion.Item eventKey={ind} key={ind}>
                                                <Accordion.Header> {val.que}</Accordion.Header>
                                                <Accordion.Body   dangerouslySetInnerHTML={{ __html: val.ans }} >


                                                </Accordion.Body>
                                            </Accordion.Item>


                                        })}
                                    </Accordion>
                                </div>

                            })}


                        </div>
                    </div>
                    <div className="row justify-content-center">

                        <div className="col col-12 col-sm-4">
                            <NavLink to="/register" className="btn btn-primary btn-lg d-block" >
                                <FaSignInAlt /> Register Today</NavLink></div></div>
                </div>
            </div>
        </React.Fragment>
    )




}

export default PageLayout(FAQs);
