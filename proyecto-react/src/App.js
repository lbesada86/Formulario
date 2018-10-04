import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CreditCardInput from 'react-credit-card-input';
const countries = require('country-list')();
const paises = countries.getNames();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tipo: '',
      nomyape: '',
      email: '',
      pais: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
    }
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isCompleteName', (value) => {
      if (value.indexOf(' ') === -1){
        return false;
      }
      return true;
    }
  
  );

  }
  handleClick = (e) =>  {
    e.preventDefault();
    
    fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(this.enviar)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('Objeto posteado:', data.html_url);
			})
			.catch((error) => {
				console.log(error, 'catch the hoop');
			});
	};
  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {tipo,nomyape,email,pais,cardNumber,expiry,cvc}=this.state;
    // console.log(this.state.tipo);
    // console.log(this.state.nombre);
    // console.log(this.state.email);
    // console.log(this.state.pais);
    this.enviar = {
      tipo:tipo,
      nomyape:nomyape,
      email:email,
      pais:pais,
      cardNumber:cardNumber,
      expiry:expiry,
      cvc:cvc
    }
  
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Suscribirse aqui</h1>
        </header> */}
        <h1>Suscribirse:</h1>
        <div>Ingrese tipo de cuenta</div>
        <div>
        <FormControl className="formControl">
          <InputLabel htmlFor="age-simple">Tipo</InputLabel>
          <Select
            value={this.state.tipo}
            onChange={this.handleChange}
            input={<Input name= 'tipo'/>}
          >
            <MenuItem value="">
              <em>Seleccione tipo de cuenta</em>
            </MenuItem>
            <MenuItem value={10}>Premium</MenuItem>
            <MenuItem value={20}>Free</MenuItem>
          </Select>
          <p></p>
        </FormControl>
        </div>
        <div>Ingrese Pais </div>
        <div>
        <FormControl className="formControl">
          <InputLabel htmlFor="age-simple">Pais</InputLabel>
          <Select
            value={this.state.pais}
            onChange={this.handleChange}
            input={<Input name = 'pais' id = 'age-simple'/>}
          >
          {paises.map((pais) => (<MenuItem value={pais}>{pais}</MenuItem>))}
            <MenuItem value="pais">
              <em>Seleccionar pais</em>
            </MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
          <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Ingrese nombre y apellido"
                    onChange={this.handleChange}
                    name="nomyape"
                    value={nomyape}
                    validators={['required', 'isCompleteName']}
                    errorMessages={['Este campo es requerido', 'Nombre y apellido no valido']}
                />
               
            </ValidatorForm>
        </div>
          <div>
            <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
            <TextValidator
                label="Ingrese email"
                onChange={this.handleChange}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['Este campo es requerido', 'Email no valido']}
            />
               
            </ValidatorForm>
          </div>
       {tipo === 10 &&
       <CreditCardInput
        cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
          <input
            {...props}
            onChange={handleCardCVCChange(e =>
              this.setState({ cvc: e.target.value })
              // console.log('cvc change', e)
          )}
          />
        )}
        cardExpiryInputRenderer={({ handleCardExpiryChange, props }) => (
          <input
            {...props}
            onChange={handleCardExpiryChange(e =>
              this.setState({ expiry: e.target.value })
              // console.log('expiry change', e)
            )}
          />
        )}
        cardNumberInputRenderer={({ handleCardNumberChange, props }) => (
          <input
            {...props}
            onChange={handleCardNumberChange(e =>
              this.setState({ expiry: e.target.value })
              // console.log('number change', e)
            )}
          />
        )}
      />
      }
        <p></p>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    );
  }
}

export default App;
