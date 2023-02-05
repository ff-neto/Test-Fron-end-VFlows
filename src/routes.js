import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login'
import ContratosVinculados from './pages/ContratosVinculados/ContratosVinculados'
import DadosNotaFiscal from './pages/DadosNotaFiscal/DadosNotaFiscal'
import RequireAuth from './require'

export default function MenuRotas() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/contratos-vinculados" element={<RequireAuth><ContratosVinculados /></RequireAuth>} />
            <Route path="/dados-nota-fiscal" element={<RequireAuth><DadosNotaFiscal /></RequireAuth>} />
        </Routes>
    )
}
