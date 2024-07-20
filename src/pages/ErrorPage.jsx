import React from 'react';
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  return (
    <main className="main-error">
      <div className="video-wrapper">
        <div className="overlay-error"></div>
        <img
          id="bgVideo"
          className="video-background"
          src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif"
          alt="GIF background"
        />
      </div>
      <div className="content-error">
        <div className="col-error-first">
          <h1 className="title-error">Error 404</h1>
          <h2 className="subtitle-error">Pagina Aún en Desarrollo</h2>
        </div>
        <div className="col-error-second">
          <button onClick={goBack} className="buttom-error">
            <i className="fas fa-angle-left flechita" aria-hidden="true"></i>
            Regresar
          </button>
        </div>
      </div>
    </main>
  );
};

function goBack() {
  window.history.back();
}

export default ErrorPage;