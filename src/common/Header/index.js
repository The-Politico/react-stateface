import React from 'react';
import classnames from 'classnames';
import { component } from './styles.scss';

class Header extends React.Component {
  render() {
    const { page } = this.props;
    return (
      <div className={classnames(component)}>
        <nav className='global'>
          <div className='header-left bt-icon--house'>
            <a href='/'>
              <svg xmlns='http://www.w3.org/2000/svg' version='1.1' x='0px' y='0px' viewBox='0 0 100 100' enableBackground='new 0 0 100 100' xmlSpace='preserve'><path d='M79.5,81.458h-57V41.27L51,16.729L79.5,41.27V81.458z M25.5,78.458h51V42.646L51,20.688L25.5,42.646V78.458z' />
              </svg>
            </a>
          </div>
          <b className='bt-icon bt-icon--politico' />
          <span className='project-name'>
            {' / '}
            <a href={page ? '../' : './'}>ReactStateFace</a>
            {page &&
              <>
                {' / '}
                <a href='./'>State</a>
              </>
            }

          </span>
        </nav>
      </div>
    );
  }
}

Header.defaultProps = {
  link: '../',
};

export default Header;
