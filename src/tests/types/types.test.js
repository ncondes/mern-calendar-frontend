
import { types } from '../../types/types';
describe('Pruebas en Types', () => {

    test('Los types deben de ser iguales', () => {
        
        expect( types ).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventAddNew: '[event] Add New',
            eventLogout: '[event] Logout',
            eventStartAddNew: '[event] Start Add New',
            eventSetActive: '[event] Set Active',
            eventClearActiveEvent: '[event] Clear Active Note',
            eventUpdated: '[event] Event Updated',
            eventDeleted: '[event] Event Deleted',
            eventLoaded: '[event] Events Loaded',
        
            authCheckingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start Login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        
        });

    });
    
})