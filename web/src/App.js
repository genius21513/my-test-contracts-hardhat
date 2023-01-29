import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NFTMarketPlace from "./pages/NFTMarketPlace";
import CustomizeToken from "./pages/CustomizeToken";
import P404 from "./pages/P404";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="CT" element={<CustomizeToken />} />
                    <Route path="NFT_MP" element={<NFTMarketPlace />} />
                    <Route path="*" element={<P404 />} />
                </Route>
            </Routes>
        </>
    )
}