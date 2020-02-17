import { extend } from "vee-validate";
extend("Required", value => {
  value.length > 0;
});

export default {};
