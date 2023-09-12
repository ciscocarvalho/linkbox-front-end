import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './dashboard.css';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <>
    <script src="scripts/dashboard.js" type="module" defer></script>

    <nav>
        <div className="brand-box">
            <a href="/">
                <div className="brand">
                    <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
                    <p className="website-name">LinkBox</p>
                </div>
            </a>
        </div>
        <div className="input-container">
            <input type="text" placeholder="Pesquise" id="inputPesquisa" />
            <label htmlFor="inputPesquisa">
                <span className="material-symbols-outlined">search</span>
            </label>
        </div>
        <div></div>
    </nav>

    <main>
        <header className="cards-header">
            <div className="cards-header-left">
                <div className="btn go-back-btn hidden">
                    <span className="material-symbols-outlined">arrow_back</span>
                </div>
            </div>
            <div className="cards-header-right">
                <div className="btn cancel-paste-btn hidden">
                    <span className="material-symbols-outlined">cancel</span>
                </div>
                <div className="btn paste-btn hidden">
                    <span className="material-symbols-outlined">content_paste</span>
                </div>
                <div className="btn add-btn">
                    <span className="material-symbols-outlined">add</span>
                </div>
                <p className="current-folder-name hidden"></p>
            </div>
        </header>
        <p className="empty-folder-message hidden">
            Esta pasta está vazia.
            <br />
            Adicione um link ou uma pasta clicando no botão +
        </p>
        <div className="cards-container hidden"></div>
        <footer className="cards-footer hidden">
            <p className="text-selected-cards"></p>
            <div className="cards-footer-btn-container">
                <div className="btn copy-btn">
                    <span className="material-symbols-outlined">content_copy</span>
                </div>
                <div className="btn cut-btn">
                    <span className="material-symbols-outlined">cut</span>
                </div>
                <div className="btn delete-btn">
                    <span className="material-symbols-outlined">delete</span>
                </div>
            </div>
        </footer>
    </main>
    <aside className="side-menu hide">

            <div className="exit">
                <span className="material-symbols-outlined exit-btn">
                    close
                    </span>
            </div>
           <div className="side-options">
            <div className="side-content">
                <a href="/">
                <span className="material-symbols-outlined side-btn">
                    logout
                    </span> <span className="side-text">Sair</span>
                </a>    
            </div>
            <div className="side-content">
                <span className="material-symbols-outlined side-btn">
                    switch_account
                    </span><span className="side-text">Mudar de Conta</span>
            </div>
           </div>
    </aside>
  </>
};

export default page;
