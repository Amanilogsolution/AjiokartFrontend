
import React from 'react';
import { useForm } from "react-hook-form";

const SocialInfo = ({ updataData, brandingData }) => {
    const { handleSubmit, register } = useForm();

    const onSubmit = data => {

        updataData(data)

    }
    return (
        <React.Fragment>


            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="panel-body pt-5">

                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="fbLink" className="col-12 col-sm-3 col-md-3">Facebook: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="url"
                                    className="form-control"
                                    id="fbLink"
                                    placeholder="Facebook page link"
                                    name="fbLink"
                                    defaultValue={brandingData?.fbLink}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="twitterLink" className="col-12 col-sm-3 col-md-3">Twitter: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="url"
                                    className="form-control"
                                    id="twitterLink"
                                    placeholder="Twitter Link"
                                    name="twitterLink"
                                    defaultValue={brandingData?.twitterLink}
                                    ref={register()}

                                />

                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="InstagramURL" className="col-12 col-sm-3 col-md-3">Instagram ID: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="text"
                                    className="form-control"
                                    id="InstagramURL"
                                    placeholder="Instagram URL"
                                    name="InstagramURL"
                                    defaultValue={brandingData?.InstagramURL}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="youtubeChannel" className="col-12 col-sm-3 col-md-3">Youtube: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="url"
                                    className="form-control"
                                    id="youtubeChannel"
                                    placeholder="Youtube Channel URL"
                                    name="youtubeChannel"
                                    defaultValue={brandingData?.youtubeChannel}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="linkedInBusinessPage" className="col-12 col-sm-3 col-md-3">LinkedIn Business Page URL: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="url"
                                    className="form-control"
                                    id="linkedInBusinessPage"
                                    placeholder="LinkedIn Business Page URL:"
                                    name="linkedInBusinessPage"
                                    defaultValue={brandingData?.linkedInBusinessPage}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="pinterest" className="col-12 col-sm-3 col-md-3">Pinterest: </label>

                            <div className="col-12 col-sm-9 col-md-6">
                                <input type="url"
                                    className="form-control"
                                    id="pinterest"
                                    placeholder="Pinterest"
                                    name="pinterest"
                                    defaultValue={brandingData?.pinterest}
                                    ref={register()}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12 offset-md-3 col-md-9">
                                <button type="submit" className="btn btn-danger btn-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </React.Fragment >
    )

}

export default SocialInfo;
