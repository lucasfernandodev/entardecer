import { isValidHttpUrl } from "../../../../utils/isValidHttpUrl";

type inputs = Record<string, null | HTMLInputElement>

export const InputValidade = (inputs: inputs) => {
  const errors = []
  const inputKeys = Object.keys(inputs)

  for (let i = 0; i < inputKeys.length; i++) {
    const field = inputKeys[i];
    const input = inputs[i]

    if (input === null) throw new Error(`Input ${field} doesn't exist.`)

    if (field[i] === "title") {
      if (input.value === "") {
        errors.push({
          el: input,
          message: "O campo title não pode ficar em branco",
        });
      }

      if (input.value.length < 4) {
        errors.push({
          el: input,
          message: "O campo title deve ter no minimo 4 letras",
        });
      }

      if (input.value.length > 32) {
        errors.push({
          el: input,
          message: "O campo title deve ter no maximo 32 letras",
        });
      }
    }

    if (field[i] === "url") {
      if (input.value === "") {
        errors.push({
          el: input,
          message: "O campo url não pode ficar em branco",
        });
      }

      if (!isValidHttpUrl(input.value)) {
        errors.push({
          el: input,
          message: "O campo url digitado é invalido",
        });
      }
    }

  }

  return errors;
}
