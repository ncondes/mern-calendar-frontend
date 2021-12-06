import { uiReducer } from '../../reducers/uiReducer';
import { types } from '../../types/types';
import { uiCloseModal, uiOpenModal } from '../../actions/ui';


const initState = {
    modalOpen: false,
}

describe('Pruebas en uiReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        
        const state = uiReducer( initState, {} );

        expect( state ).toEqual( initState );

    });

    test('Debe de abrir y cerrar el modal', () => {
        
        const modalOpen = uiOpenModal();
        const state = uiReducer(initState, modalOpen );

        expect( state ).toEqual({
            modalOpen: true,
        })

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( initState, modalClose );

        expect( stateClose ).toEqual({
            modalOpen: false,
        })

    })
    
    
})