/**
 * A fita.
 *
 * A cunha diagonal que jsk.pt sobrepõe aos heróis. A geometria é a do ficheiro
 * do cliente (`Design-sem-nome-3.png`, 1171×535), lida pixel a pixel: as duas
 * arestas de cima partem do mesmo ponto, uma desce a 45° e a outra abre para a
 * esquerda. O `viewBox` mantém esses números, e o `slice` corta o excesso como
 * um `background-size: cover` — que é exactamente o que o site actual faz.
 * Percentagens num `clip-path` torceriam os ângulos com a forma do ecrã.
 *
 * O amarelo é o `--color-amarelo`, o mesmo hexadecimal que está no PNG. jsk.pt
 * põe preto por baixo e `mix-blend-mode: multiply` a 30%, e é por isso que lá a
 * fita sai cinzento-azulada em vez de amarela.
 *
 * As opacidades são baixas porque a fita passa por cima do título: a mais
 * escura mede-se contra o branco do texto, não contra o gosto. Se mudarem,
 * refaz-se a conta do véu do herói que estiver por baixo — as duas camadas
 * medem-se juntas, nunca em separado.
 *
 * Estava dentro do `Heroi.tsx` da homepage e saiu de lá quando a `/obras/`
 * passou a precisar dela. Não leva props: uma fita com parâmetros era o
 * princípio de duas fitas diferentes.
 */
export function Fita() {
  return (
    <svg
      viewBox="0 0 1171 535"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      <polygon
        points="681,0 1171,0 1171,489"
        className="fill-amarelo opacity-[0.07]"
      />
      <polygon
        points="681,0 1015,334 841,535 206,535"
        className="fill-amarelo opacity-[0.14]"
      />
    </svg>
  );
}
