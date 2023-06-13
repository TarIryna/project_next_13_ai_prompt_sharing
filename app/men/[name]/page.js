import { menuData } from "@utils/data";

export const getStaticPaths = async () => {
  const result = Object.keys(menuData["Чоловіки"]);

  return {
    paths: result.map((item) => ({
      params: {
        name: item,
      },
    })),
    fallback: "blocking",
  };
};

// export const getStaticProps = async ({ params }) => {
//   return {
//     props: {
//       categories: categories.result || [],
//       providers: providers.result || [],
//       collections: collections.result || [],
//     },
//   };
// };

const Category = () => {};

export default Category;
