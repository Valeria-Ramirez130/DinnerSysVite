import React from 'react';

const UserProfile = ({ userData }) => {
  return (
    <div className="user-profile">
      <h3>Perfil de Usuario</h3>
      <p>Nombre: {userData.nombre}</p>
      <p>Rol: {userData.rol}</p>
    </div>
  );
};

export default UserProfile;
