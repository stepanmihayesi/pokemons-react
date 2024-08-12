// import React from 'react'
interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

function PokemonBlock(props: Props) {
  const { id, name, image, type } = props;
  return (
    <div>
      <section className={`poke-block-container card ${type}`}>
        <p className="poke-name"># {id}</p>
        <p className="poke-name">{name}</p>
        <img src={image} alt={name} />
        <p className="poke-name">Type : {type}</p>
      </section>
    </div>
  );
}
export default PokemonBlock;
