import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";
import FileExplorer from "../FileExplorer/FileExplorer";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import FileUploadModal from "../FileUploadModal/FileUploadModal";
import FolderCreationModal from "../FolderCreationModal/FolderCreationModal";
import SettingsModal from "../SettingsModal/SettingsModal";
import api from "../../api/storage";

function App() {
  const [idToken, setIdToken] = useState("");
  const [profile, setProfile] = useState({});
  const [explorerPath, setExplorerPath] = useState(""); // Current file explorer path
  const [doRefresh, refreshExplorer] = useState(true);

  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [folderCreatorOpen, setFolderCreatorOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(true); // To control the auth modal

  return (
    <div className="App">
      <nav>
        <Sidebar
          profile={profile}
          openFileUpload={() => setFileUploadOpen(true)}
          openFolderCreator={() => setFolderCreatorOpen(true)}
          openSettings={() => setSettingsOpen(true)}
        />
      </nav>

      {authOpen && (
        <GoogleAuth
          setIdToken={(t) => {
            api.idToken = t;
            setIdToken(t);
            setAuthOpen(false);
          }}
          setProfile={setProfile}
        />
      )}

      <section className="app-content">
        <FileExplorer
          idToken={idToken}
          profile={profile}
          setExplorerPath={setExplorerPath}
          doRefresh={doRefresh}
          didRefresh={() => refreshExplorer(false)}
        />
      </section>

      <FileUploadModal
        open={fileUploadOpen}
        closeModal={() => {
          setFileUploadOpen(false);
          refreshExplorer(true);
        }}
        path={explorerPath}
        onSuccess={() => {
          setFileUploadOpen(false);
          refreshExplorer(true);
        }}
      />
      <FolderCreationModal
        open={folderCreatorOpen}
        closeModal={() => setFolderCreatorOpen(false)}
        path={explorerPath}
        onSuccess={() => {
          setFolderCreatorOpen(false);
          refreshExplorer(true);
        }}
      />
      <SettingsModal
        open={settingsOpen}
        closeModal={() => setSettingsOpen(false)}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
