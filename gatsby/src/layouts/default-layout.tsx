import React, { ReactElement } from 'react';
import classnames from 'classnames';

import Header from '@/components/header';
import Footer from '@/components/footer';
import I18n from '@/components/i18n';
import styles from './default-layout.module.scss';
import { useBackgroundImageStyle } from '@/hooks/useBackgroundImageStyle';
import { ISitePageContext } from 'graphql-types';

interface IProps {
  children: ReactElement[];
  pageContext: ISitePageContext;
}

const DefaultLayout: React.FC<IProps> = ({ children, pageContext }) => {
  const backgroundImageStyle = useBackgroundImageStyle();

  return (
    <div
      style={backgroundImageStyle}
      className={classnames('body__wrapper', styles.wrapper, styles.bkgPhoto)}
    >
      <Header
        pageContext={pageContext}
        navItems={[
          { label: I18n('home'), to: '/' },
          { label: I18n('life_situations'), to: I18n('slug_situations') },
          { label: I18n('current_measures'), to: I18n('slug_measures') }, // TODO: přidat podmínku pouze pokud je na HP obsah
        ]}
      />
      <main className={styles.main}>
        <div className={styles.mainInner}>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
