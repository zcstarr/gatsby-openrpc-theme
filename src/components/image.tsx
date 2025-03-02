import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          gatsbyImageData
          original {
            src
          }
        }
      }
    }
  `);

  const image = data.allImageSharp.nodes.find(
    (node: { original: { src: string } }) => node.original.src.includes(src)
  );

  if (!image) {
    return <img src={src} alt={alt} className={className} />;
  }

  const gatsbyImage = getImage(image) as IGatsbyImageData;
  
  return <GatsbyImage image={gatsbyImage} alt={alt} className={className} />;
};

export default Image;
