const paths = {
  homePage: () => '/',
  topicShow: (slug: string) => `/topics/${slug}`,
  postCreate: (slug: string) => `/topics/${slug}/posts/new`,
  postShow: (slug: string, id: string) => `/topics/${slug}/posts/${id}`,
};

export default paths;