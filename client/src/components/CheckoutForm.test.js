import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows
const setup = () => {
    render(<CheckoutForm />);
    const header = screen.getByText(/checkout form/i)
    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const address = screen.getByLabelText(/address/i)
    const city = screen.getByLabelText(/city/i)
    const state = screen.getByLabelText(/state/i)
    const zip = screen.getByLabelText(/zip/i)
    const submitButton = screen.getByTestId("checkoutSubmit")
    return {
      header,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      submitButton
    };
  };


  test("form header renders", () => {
    const { header } = setup()
    expect(header).toHaveTextContent(/checkout form/i)
  });

  test("form shows success message on submit with form details", async () => {
    const { firstName, lastName, address, city, state, zip, submitButton } = setup()
    const inputFields = ( input, value ) => {
      fireEvent.change(input, {target: {value: value}});
    }
  
    inputFields( firstName, 'Bob')
    inputFields( lastName, 'Joness')
    inputFields( address, '1234 An Address')
    inputFields( city, 'Some City')
    inputFields( state, 'CA')
    inputFields( zip, '12345')
    
    fireEvent.click(submitButton)
    await expect(screen.getByText(/Bob/i)).toHaveTextContent(/Bob/i)
    await expect(screen.getByText(/Joness/i)).toHaveTextContent(/Joness/i)
    await expect(screen.getByText(/1234 An Address/i)).toHaveTextContent(/1234 An Address/i)
    await expect(screen.getByText(/Some City/i)).toHaveTextContent(/Some City/i)
    await expect(screen.getByText(/CA/i)).toHaveTextContent(/CA/i)
    await expect(screen.getByText(/12345/i)).toHaveTextContent(/12345/i)
  
  
  });
