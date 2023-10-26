import './App.css'
import Header from './Header';
import Post from './Post';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import IndexPage from './pages/IndexPage';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<div>login page</div>} />
      </Route>
    </Routes>
  );
}

export default App
