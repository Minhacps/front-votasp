import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import firebase from 'firebase/app';
import classnames from 'classnames';

import { VOTER, CANDIDATE } from '../../constants/userRoles';
import { getCurrentUser } from '../../Questionario/QuestionarioService';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './MainMenu.css';

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isCandidate: false,
    };

    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }

  componentDidMount = () => {
    getCurrentUser().then(doc => {
      const user = doc.data();
      this.setState({
        isCandidate: (user.role === CANDIDATE)
      });
    });
  };

  toggleMainMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isCandidate } = this.state;

    return (
      <nav className={classnames(
        'navigation-menu',
        { 'opened': this.state.isOpen },
      )}>
        <HamburgerMenu onClick={this.toggleMainMenu} />
        <ul className="navigation-menu">
          <li className="navigation-menu__list">
            <NavLink to="/como-funciona" activeClassName="active" className="navigation-menu__link">
              Como funciona
            </NavLink>
          </li>
          <li className="navigation-menu__list">
            <NavLink to="/questionario/1" activeClassName="active" className="navigation-menu__link">
              Questões
            </NavLink>
          </li>
          <li className="navigation-menu__list">
            <NavLink to="/ranking" activeClassName="active" className="navigation-menu__link">
              Ver meu ranking
            </NavLink>
          </li>
          {isCandidate &&
            <li className="navigation-menu__list">
              <NavLink to="/atualizar-informacoes" activeClassName="active" className="navigation-menu__link">
                Atualizar informações
              </NavLink>
            </li>
          }
          <li className="navigation-menu__list">
            <button className="navigation-menu__link" onClick={() => firebase.auth().signOut()}>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default MainMenu;
