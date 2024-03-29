import React, { useState, useEffect, useContext } from 'react';
import './landlord-main.css';
import AdList from '../add-list/add-list';
import { useNavigate } from 'react-router-dom';
import { CREATE_OBJECT_PAGE, LANDLORD_DASHBOARD_ROUTE } from '../../utils/conts';
import { Context } from '../..';
import { create, deleteApart, getAll, getLandlordApartments, getOneUpdate } from '../../http/objectApi';
import RegistrationModal from '../registration-modal/registration-modal';

function LandlordMain() {
    const { user, object } = useContext(Context);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [apartments, setApartments] = useState([]);
    const [deleteModalActive, setDeleteModalActive] = useState(false)
    const [apartmentToDelete, setApartmentToDelete] = useState(null);

    const fetchApartments = async () => {
        try {
            const currentUser = user.user;
            const data = await getAll(currentUser.id);
            setApartments(data);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    useEffect(() => {
        fetchApartments();
    }, [currentPage]); // Fetch apartments when currentPage changes

    const handleNavigate = async () => {
        const currentUser = user.user;
        const newObject = await create(currentUser.id);
        object.setObject(newObject);
        navigate(CREATE_OBJECT_PAGE);
    };

    const renderApartmentMenu = (apartmentId, menuOpen, handleMenuClick) => {
        console.log(handleMenuClick)
        return (
            <div className="dropdown">
                <div className="dots" onClick={() => handleMenuClick(apartmentId)}>
                    ⋮
                </div>
                {apartmentId === menuOpen && (
                    <div className="dropdown-content">
                        <div onClick={() => handleEdit(apartmentId)}>Редактировать</div>
                        <div onClick={() => { setApartmentToDelete(apartmentId); setDeleteModalActive(true) }}>Удалить</div>
                    </div>
                )}
            </div>
        );
    };


    const handleEdit = async (apartmentId) => {
        const currentUser = user.user;
        const newObject = await getOneUpdate(apartmentId, currentUser.id);
        if (newObject !== null) {
            object.setObject(newObject);
            navigate(CREATE_OBJECT_PAGE);
        }
    };

    const handleDelete = async () => {
        if (apartmentToDelete) {
            const currentUser = user.user;
            const newObject = await deleteApart(apartmentToDelete, currentUser.id);
            if (newObject !== null) {
                object.setObject([]);
                const data = await getAll(currentUser.id);
                setApartments(data);
                setDeleteModalActive(false)
            }
        }
    };

    return (
        <div className='landlordMain'>
            <div className='wrapperButtonAdv'>
                <button className='createAdv' onClick={handleNavigate}>
                    Создать объявление
                </button>
            </div>
            <AdList apartments={apartments} renderMenu={renderApartmentMenu} />

            <RegistrationModal active={deleteModalActive} setActive={setDeleteModalActive}>
                <div className='firstLine'>
                    <span className="close" onClick={() => setDeleteModalActive(false)}>&times;</span>
                    <h2>Вы действительно хотите удалить данный объект?</h2>
                </div>
                <button onClick={() => { handleDelete(); setDeleteModalActive(false) }}>Да</button>
            </RegistrationModal>
        </div>
    );
}

export default LandlordMain;
