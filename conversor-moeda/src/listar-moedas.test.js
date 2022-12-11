import React from "react";
import { ReactDOM } from "react";
import ListarMoedas from "./listar-moedas";


describe('teste do componente de listagem de moedas',()=>{
    it('deve renderizar sem erros',()=>{
        const div = document.createElement('div');
        ReactDOM.render(<ListarMoedas/>,div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
