import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import '../styles/HeaderTechnical.css';
import logo_web from "../picture/logo-1.webp";
import { FilterContext } from '../components/FilterContext';

function HeaderTechnical() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm]= useState('');
  const { filterStatus, setFilterStatus } = useContext(FilterContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/technical/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    navigate(`/technical/${status === 'resolved' ? 'responsed' : 'unresponse'}`);
  };

  const handleLogoClick = () => {
    setFilterStatus('all');
    navigate('/technical');
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/technical" onClick={handleLogoClick}>
          <img src={logo_web} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="header">
        <ul>
          <li>
            <span
              className={`filter-status ${filterStatus === 'resolved' ? 'filter-resolved' : ''}`}
              onClick={() => handleFilter('resolved')}
            >
              ĐÃ PHẢN HỒI
            </span>
          </li>
          <li>
            <span
              className={`filter-status ${filterStatus === 'pending' ? 'filter-pending' : ''}`}
              onClick={() => handleFilter('pending')}
            >
              CHƯA PHẢN HỒI
            </span>
          </li>
        </ul>
      </div>
      <div className="search">
        <ul>
          <li>
            <input
              placeholder="Tìm kiếm tiêu đề lỗi"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
            />
          </li>
        </ul>
      </div>
      <div className="user-infor">
        <ul>
          <li>Technical</li>
          <button onClick={handleLogout} className="button-logout" >
            Đăng Xuất
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default HeaderTechnical;