import React, { useState, useEffect } from 'react';
import './create-appartment.css';
import FirstStepCreate from '../first-step-create/firstStepCreate';
import SecondStepCreate from '../second-step-create/secondStepCreate';
import ThirdStepCreate from '../third-step-create/thirdStepCreate';
import LastStepCreate from '../last-step-create/LastStepCreate';
import { useNavigate } from 'react-router-dom';
import { LANDLORD_DASHBOARD_ROUTE } from '../../utils/conts';
import { useContext } from 'react';
import { Context } from '../..';

const CreateApartment = () => {
    const { user, object } = useContext(Context);
    const [step, setStep] = useState(1);
    const [apartmentData, setApartmentData] = useState(object.objects);

    const handleNextStep = () => {
        // Ваша логика валидации данных
        setStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        }
    };
    const navigate = useNavigate()
    const handleSaveData = () => {
        navigate(LANDLORD_DASHBOARD_ROUTE)
    }

    const handleSubmit = () => {
        // Отправка данных на сервер
        console.log('Отправка данных на сервер:', apartmentData);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <FirstStepCreate
                        apartmentData={apartmentData}
                        handleNextStep={handleNextStep}
                        setNewData={setApartmentData}
                    />
                );
            case 2:
                return (
                    <SecondStepCreate
                        apartmentData={apartmentData}
                        handlePreviousStep={handlePreviousStep}
                        handleNextStep={handleNextStep}
                        setNewData={setApartmentData}
                    />
                );
            case 3:
                return (
                    <ThirdStepCreate
                        apartmentData={apartmentData}
                        handlePreviousStep={handlePreviousStep}
                        handleSubmit={handleSubmit}
                        handleNextStep={handleNextStep}
                    />
                );
            case 4:
                return (
                    <LastStepCreate
                        apartmentData={apartmentData}
                        handlePreviousStep={handlePreviousStep}
                        handleSubmit={handleSubmit}
                        saveData={handleSaveData}
                        publishData={handleSaveData}
                        setNewData={setApartmentData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='wrapperCreate'>
            {renderStep()}
        </div>
    );
};

export default CreateApartment;
