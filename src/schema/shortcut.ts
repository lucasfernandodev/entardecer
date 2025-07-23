import z from "zod";
// Fix Content Security Policy directive problem - causing by zod eval
z.config({ jitless: true });

export const shortcutScheme = z.object({
  icon: z.string().optional(),
  title: z.string().min(1, 'O titulo não pode ficar vazio').max(512, "O titulo aceita no maximo 512 caracteres"),
  url: z.url({message: 'Url invalida'})
})