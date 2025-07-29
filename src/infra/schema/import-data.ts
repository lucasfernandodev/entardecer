import z from "zod";

export const importDataScheme = z.object({
  shortcuts: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    url: z.url()
  })),
  background: z.object({
    type: z.enum(['image', 'color']),
    color: z.string().regex(/^#[0-9A-Fa-f]+$/, {
      message: 'Deve ser uma cor hex no formato #RRGGBB',
    }).transform((val) => val as `#${string}`),
    isCrop: z.boolean(),
  }),
  overlay: z.object({
    opacity: z.string().regex(/^(100|[1-9]?[0-9])$/, {
      message: 'Opacidade deve ser string representando uma percentagem entre 0% e 100%',
    }
    ),
  }),
  painel: z.object({
    visibility: z.enum(['show', 'hidden']),
    position: z.enum(['left', 'center', 'right']),
  }),
})