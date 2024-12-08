import mustache from "mustache";

const Mustache = (endpoint: string, slug: any) => {
  return slug ? mustache.render(endpoint, slug) : endpoint;
};

export default Mustache;
