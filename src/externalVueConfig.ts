import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const externalVueConfig = ({ vueInstance = null }): void => {
  // @ts-ignore
  vueInstance?.component("fa", FontAwesomeIcon);
};

export { externalVueConfig };
export default externalVueConfig;
