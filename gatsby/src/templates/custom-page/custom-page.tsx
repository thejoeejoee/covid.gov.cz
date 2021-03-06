import { IPage, IQuery } from 'graphql-types';

import { SchemaComp } from '@/components/schema/schema';
import { SEO as Seo } from 'gatsby-plugin-seo';
import React from 'react';
import Container from '@/components/container';
import { graphql } from 'gatsby';
import Breadcrumb from '@/components/breadcrumb';
import Layout from '@/layouts/default-layout';
import I18n from '@/components/i18n';

interface IProps {
  data: IQuery;
}

const CustomPage: React.FC<IProps> = ({ data }) => {
  const page: IPage = data.page;

  return (
    <Layout>
      <Seo
        title={page.title}
        description={page.meta_description ?? 'Custom page meta description.'}
        pagePath={page.path.alias}
        htmlLanguage={page.langcode}
      />
      <SchemaComp
        canonicalUrl={'https://covid.gov.cz' + page.path.alias}
        datePublished={page.changed}
        defaultTitle={page.title}
        isBlogPost
        description={page.meta_description}
        body={page.content.processed}
        title={page.title}
        url={'https://covid.gov.cz' + page.path.alias}
        organization={{
          url: 'https://gov.cz',
          name: 'Portál veřejné správy',
        }}
      />
      <Container className="mb-4">
        <div className="pt-1">
          <Breadcrumb
            items={[{ title: I18n('home'), url: '/' }, page.title]}
            variant="inverse"
          />
        </div>
        <h1 className="text-white mt-2 h2 font-weight-bold">{page.title}</h1>
        <article className="bg-white rounded p-2 mb-1">
          {page.content && (
            <div dangerouslySetInnerHTML={{ __html: page.content.processed }} />
          )}
        </article>
      </Container>
    </Layout>
  );
};

export default CustomPage;

export const query = graphql`
  query($slug: String!, $langCode: String!) {
    page(path: { alias: { eq: $slug } }) {
      id
      content {
        processed
      }
      langcode
      title
      changed
      meta_description
      path {
        alias
      }
    }
    translation(langcode: { eq: $langCode }, source: { eq: "home" }) {
      target
    }
  }
`;
