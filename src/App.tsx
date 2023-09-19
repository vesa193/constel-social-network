import './App.css';
import { modals } from './modals';
import renderModals, { IModal } from './renderModals';
import { MainRouter } from './router/routerManager';

function App() {
    return (
        <>
            <MainRouter />
            {renderModals(modals as IModal[])}
        </>
    );
}

export default App;
