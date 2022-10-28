/// <reference types= "cypress" />

import { format, prepareLocalStorage } from '../support/utils'

context('Dev Finances Agilizei', () => {

   beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/#')
    onBeforeLoad: (win) => {
     prepareLocalStorage(win)

    }


    cy.get('#data-table tbody tr').should('have.length', 0 )
    
   });
    
    it('Cadastrar entradas', () => {
       
        cy.get('#transaction .button').click()
        cy.get('#description').type('Salário')
        cy.get('[name=amount]').type(500)
        cy.get('[type=date]').type('2022-10-25')
        cy.get('button').contains('Salvar').click()

        cy.get('#data-table tbody tr').should('have.length', 1 )
    });

        it('Cadastrar saídas', () => {
          
            cy.get('#transaction .button').click()
            cy.get('#description').type('maquiagem')
            cy.get('[name=amount]').type(-500)
            cy.get('[type=date]').type('2022-10-26')
            cy.get('button').contains('Salvar').click()
    
            cy.get('#data-table tbody tr').should('have.length', 1 )
 });

 it('Remover entradas e saídas', () => {

    

     const entrada = 'salário'
     const saida = 'chocolate'
  

    cy.get('#transaction .button').click()
    cy.get('#description').type('salário')
    cy.get('[name=amount]').type(100)
    cy.get('[type=date]').type('2022-10-25')
    cy.get('button').contains('Salvar').click()

    cy.get('#transaction .button').click()
    cy.get('#description').type('chocolate')
    cy.get('[name=amount]').type(-35)
    cy.get('[type=date]').type('2022-10-26')
    cy.get('button').contains('Salvar').click()

   cy.get('td.description')
    cy.contains(entrada)
    .parent()
    .find('img[onclick*=remove]')
    .click()
   
    cy.get('td.description')
    cy.contains(saida)
    .siblings()
    .children('img[onclick*=remove]')
    .click()

    cy.get('#data-table tbody tr').should('have.length', 0)
    
   
 });


it.only('Validar saldo com diversas transações', () => {
    const entrada = 'salário'
    const saida = 'chocolate'
   


   cy.get('#transaction .button').click()
   cy.get('#description').type('salário')
   cy.get('[name=amount]').type(100)
   cy.get('[type=date]').type('2022-10-25')
   cy.get('button').contains('Salvar').click()

   cy.get('#transaction .button').click()
   cy.get('#description').type('chocolate')
   cy.get('[name=amount]').type(-35)
   cy.get('[type=date]').type('2022-10-26')
   cy.get('button').contains('Salvar').click()



   let incomes = 0
   let expenses = 0

    cy.get('#data-table tbody tr')
        .each(($el, index, $list) => {
         
            cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
                 if (text.includes('-')) {
                    expenses = expenses + format(text)
                 } else {
                    incomes = incomes + format (text)
                 }
                 cy.log('entradas', incomes)
                 cy.log('saidas', expenses)

                 })  
         
                })

        cy.get('#totalDisplay').invoke('text').then(text => {
     
            let formattedTotalDisplay = format (text) 
            let expectedTotal = incomes + expenses 

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })
        });

}); 



