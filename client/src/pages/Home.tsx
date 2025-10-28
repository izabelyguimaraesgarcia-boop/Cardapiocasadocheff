import { useMemo } from 'react';

interface MenuItem {
  name: string;
  desc?: string | null;
  price?: number;
  priceMedia?: number;
  priceGrande?: number | null;
}

interface MenuSection {
  title: string;
  type?: 'table' | 'portions' | 'bucket';
  desc?: string;
  items?: MenuItem[];
  prices?: Array<{ size: string; price: number }>;
}

function MenuItem({ name, description, price }: { name: string; description?: string | null; price: number }) {
  const priceFormatted = 'R$ ' + price.toFixed(2).replace('.', ',');
  return (
    <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800 transition duration-300 hover:bg-gray-700">
      <div className="flex justify-between items-end">
        <h3 className="text-xl font-bold text-gray-100">{name}</h3>
        <span className="flex-grow mx-3 border-b-2 border-dotted border-gray-600" style={{ position: 'relative', top: '-0.3rem' }}></span>
        <span className="text-2xl font-extrabold text-orange-400 whitespace-nowrap">{priceFormatted}</span>
      </div>
      {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
    </div>
  );
}

function SizedItem({ name, priceMedia, priceGrande, description }: { name: string; priceMedia: number; priceGrande: number | null; description?: string | null }) {
  if (priceGrande === null) {
    return <MenuItem name={name} description={description} price={priceMedia} />;
  }

  const mediaFormatted = 'R$ ' + priceMedia.toFixed(2).replace('.', ',');
  const grandeFormatted = 'R$ ' + priceGrande.toFixed(2).replace('.', ',');

  return (
    <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800 transition duration-300 hover:bg-gray-700">
      <h3 className="text-xl font-bold text-gray-100 mb-2">{name}</h3>
      {description && <p className="text-sm text-gray-400 mb-3">{description}</p>}
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-semibold">Tamanhos:</span>
        <div className="flex space-x-8">
          <div className="text-right">
            <span className="text-base font-extrabold text-orange-400">{mediaFormatted}</span>
            <div className="text-xs text-gray-500">Média</div>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold text-orange-400">{grandeFormatted}</span>
            <div className="text-xs text-gray-500">Grande</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BucketItem({ name, description, prices }: { name: string; description: string; prices: Array<{ size: string; price: number }> }) {
  return (
    <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800 transition duration-300 hover:bg-gray-700">
      <h3 className="text-xl font-bold text-gray-100">{name}</h3>
      <p className="text-sm text-gray-400 mt-1 mb-3">{description}</p>
      <div className="space-y-2 pt-2 border-t border-gray-700">
        {prices.map((p, idx) => {
          const priceFormatted = 'R$ ' + p.price.toFixed(2).replace('.', ',');
          return (
            <div key={idx} className="text-right flex justify-between items-center w-full">
              <span className="text-gray-300 font-normal">{p.size}</span>
              <span className="flex-grow mx-3 border-b-2 border-dotted border-gray-600"></span>
              <span className="text-base font-extrabold text-orange-400 whitespace-nowrap">{priceFormatted}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdditionalsTable({ items }: { items: Array<{ name: string; price: number }> }) {
  const half1 = items.slice(0, Math.ceil(items.length / 2));
  const half2 = items.slice(Math.ceil(items.length / 2));

  const renderList = (list: Array<{ name: string; price: number }>) => (
    <div className="space-y-2">
      {list.map((item, idx) => {
        const priceFormatted = 'R$ ' + item.price.toFixed(2).replace('.', ',');
        return (
          <div key={idx} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
            <span className="text-gray-300">{item.name}</span>
            <span className="text-orange-400 font-bold">{priceFormatted}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:space-x-8">
        <div className="flex-1 mb-4 sm:mb-0">
          {renderList(half1)}
        </div>
        <div className="flex-1">
          {renderList(half2)}
        </div>
      </div>
    </div>
  );
}

function MenuSection({ section }: { section: MenuSection }) {
  let content;

  if (section.type === 'table' && section.items) {
    content = <AdditionalsTable items={section.items as Array<{ name: string; price: number }>} />;
  } else if (section.type === 'portions' && section.items) {
    content = (
      <div>
        {section.items.map((item, idx) => (
          <SizedItem
            key={idx}
            name={item.name}
            priceMedia={item.priceMedia!}
            priceGrande={item.priceGrande ?? null}
            description={item.desc}
          />
        ))}
      </div>
    );
  } else if (section.type === 'bucket' && section.prices) {
    content = <BucketItem name={section.title} description={section.desc || ''} prices={section.prices} />;
  } else if (section.items) {
    content = (
      <div>
        {section.items.map((item, idx) => (
          <MenuItem key={idx} name={item.name} description={item.desc} price={item.price!} />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="section-title text-center text-3xl font-extrabold mx-auto mb-4" style={{ color: '#ff8c00', borderBottom: '4px solid #cc6600', display: 'inline-block', padding: '0.5rem 1rem' }}>
        {section.title}
      </div>
      <div className="mt-4">
        {section.desc && !section.type && (
          <p className="text-sm text-gray-400 mt-1 mb-4 p-2 border border-gray-700 rounded-lg bg-gray-800">{section.desc}</p>
        )}
        {content}
      </div>
    </div>
  );
}

export default function Home() {
  const allSections: MenuSection[] = useMemo(() => [
    {
      title: "Hambúrguer Gourmet 120g e Especiais",
      items: [
        { name: "X-Burguer", desc: "Pão com gergelim, hambúrguer, queijo prato, batata, maionese, ketchup e mostarda", price: 17.00 },
        { name: "X-Salada", desc: "Pão com gergelim, hambúrguer, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 18.00 },
        { name: "X-Egg Salada", desc: "Pão com gergelim, hambúrguer, queijo prato, ovo, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 20.00 },
        { name: "X-Bacon Salada", desc: "Pão com gergelim, hambúrguer, bacon, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 22.00 },
        { name: "X-Calabresa Salada", desc: "Pão com gergelim, hambúrguer, calabresa, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 22.00 },
        { name: "X-Frango Salada", desc: "Pão com gergelim, frango, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 22.00 },
        { name: "Frango Crispy", desc: "Pão com gergelim, frango empanado, cheddar, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 22.00 },
        { name: "X-Egg Bacon", desc: "Pão com gergelim, hambúrguer, bacon, ovo, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 24.00 },
        { name: "X-Gall Bacon", desc: "Pão com gergelim, frango, bacon, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 26.00 },
        { name: "X-Cheff", desc: "Pão com gergelim, 2 hambúrgueres, frango, bacon, calabresa, ovo, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 35.00 },
        { name: "Pão com Linguiça", desc: "Pão, linguiça, queijo e vinagrete", price: 16.00 }
      ]
    },
    {
      title: "Hambúrguer Tradicional",
      items: [
        { name: "X-Burguer", desc: "Pão com gergelim, hambúrguer, queijo prato, batata, maionese, ketchup e mostarda", price: 13.00 },
        { name: "X-Salada", desc: "Pão com gergelim, hambúrguer, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 14.50 },
        { name: "X-Bacon Salada", desc: "Pão com gergelim, hambúrguer, bacon, queijo prato, batata, salada, cebola onion, maionese, ketchup e mostarda", price: 18.00 }
      ]
    },
    {
      title: "Kids",
      items: [
        { name: "Combinho Kids", desc: "Pão, queijo, molho, suco, giz de cera, livrinho de pintura, batatinha, pirulito e bala", price: 19.99 }
      ]
    },
    {
      title: "Adicionais",
      type: 'table',
      items: [
        { name: "Ovo", price: 2.00 },
        { name: "Queijo Prato", price: 3.00 },
        { name: "Hambúrguer trad", price: 3.00 },
        { name: "Hambúrguer Gourmet", price: 6.00 },
        { name: "Catupiry", price: 5.00 },
        { name: "Cheddar", price: 5.00 },
        { name: "Calabresa", price: 5.00 },
        { name: "Frango", price: 5.00 },
        { name: "Bacon", price: 5.00 },
        { name: "Mini Batata frita", price: 5.00 }
      ]
    },
    {
      title: "Porções do Cheff",
      type: 'portions',
      items: [
        { name: "Fritas com queijo", priceMedia: 20.00, priceGrande: 22.00, desc: null },
        { name: "Fritas com queijo e bacon", priceMedia: 22.00, priceGrande: 25.00, desc: null },
        { name: "Fritas com cheddar ou catupiry", priceMedia: 22.00, priceGrande: 25.00, desc: null },
        { name: "Empanadinho aurora", priceMedia: 20.00, priceGrande: null, desc: null },
        { name: "Calabresa acebolada", priceMedia: 25.00, priceGrande: null, desc: null },
        { name: "Cebola onion", priceMedia: 25.00, priceGrande: null, desc: null },
        { name: "Frango a passarinho", priceMedia: 35.00, priceGrande: null, desc: null }
      ]
    },
    {
      title: "Balde Frango Crispy",
      type: 'bucket',
      desc: "Acompanha porção de fritas com cebola, cheddar e bacon",
      prices: [
        { size: "Pequeno", price: 27.90 },
        { size: "Médio", price: 47.90 },
        { size: "Grande", price: 79.90 }
      ]
    },
    {
      title: "Combo do Cheff",
      desc: "Acompanha porção de fritas com cebola, cheddar e bacon",
      items: [
        { name: "Combo 1", desc: "Balde de frango pequeno e refrigerante lata", price: 33.90 },
        { name: "Combo 2", desc: "Balde de frango médio e refrigerante Cibal 600ml", price: 57.90 },
        { name: "Combo 3", desc: "Balde de frango grande e refrigerante Cibal 2L", price: 94.90 },
        { name: "Combo 4", desc: "2 Balde de frango médio, 2 porções e refrigerante Cibal 2L", price: 138.90 }
      ]
    },
    {
      title: "Hot Dog",
      items: [
        { name: "Hot Dog Simples", desc: "Pão, maionese, ketchup, 2 salsichas e batata", price: 14.00 },
        { name: "Hot Dog Salada", desc: "Pão, maionese, ketchup, 2 salsichas, batata e salada", price: 15.00 },
        { name: "Hot Dog Calabresa", desc: "Pão, maionese, ketchup, 2 salsichas, batata palho e calabresa", price: 17.00 },
        { name: "Hot Dog Pizza", desc: "Pão, maionese, ketchup, 2 salsichas, batata, tomate, queijo e orégano", price: 17.00 },
        { name: "Hot Dog Frango", desc: "Pão, maionese, ketchup, 2 salsichas, batata e frango", price: 17.00 },
        { name: "Hot Dog Crispy", desc: "Pão, maionese, ketchup, 2 salsichas, batata, salada, cebola onion, queijo e cheddar", price: 19.00 },
        { name: "Hot Dog Cheff", desc: "Pão, maionese, ketchup, 2 salsichas, batata, bacon e calabresa", price: 26.00 }
      ]
    },
    {
      title: "Queijo Quente",
      items: [
        { name: "Queijo Quente", desc: "Pão, maionese, ketchup, mostarda, batata e 3 fatias duplas de queijo prato", price: 14.00 },
        { name: "Queijo Quente com Bacon", desc: "Pão, maionese, ketchup, mostarda, batata, 3 fatias duplas de queijo prato e bacon", price: 17.00 },
        { name: "Queijo Quente com Calabresa", desc: "Pão, maionese, ketchup, mostarda, batata, 3 fatias duplas de queijo prato e calabresa", price: 17.00 },
        { name: "Queijo Quente com Frango", desc: "Pão, maionese, ketchup, mostarda, batata, 3 fatias duplas de queijo prato e frango", price: 17.00 },
        { name: "Queijo Quente Pizza", desc: "Pão, maionese, ketchup, mostarda, batata, 3 fatias duplas de queijo prato, tomate e orégano", price: 17.00 }
      ]
    },
    {
      title: "Bebidas",
      items: [
        { name: "Água", desc: null, price: 3.00 },
        { name: "Água com gás", desc: null, price: 4.00 },
        { name: "Refrigerante lata", desc: null, price: 6.00 },
        { name: "H2O", desc: null, price: 6.00 },
        { name: "Cibal 600ml", desc: null, price: 5.50 },
        { name: "Coca-cola 600ml", desc: null, price: 7.50 },
        { name: "Suco Dell valle", desc: null, price: 6.00 },
        { name: "Cibal 2L", desc: null, price: 8.00 },
        { name: "Coca-cola 2L", desc: null, price: 13.00 },
        { name: "Itaipava lata", desc: null, price: 4.00 },
        { name: "Skol ou brahma", desc: null, price: 5.00 },
        { name: "Heineken", desc: null, price: 7.00 }
      ]
    }
  ], []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Título Principal */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white tracking-wider">MENU</h1>
          <h2 className="text-3xl font-bold text-orange-500 mt-2">COMPLETO</h2>
        </header>

        {/* Grid de seções para telas grandes, coluna única para mobile */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            {allSections.map((section, idx) => idx % 2 === 0 && <MenuSection key={idx} section={section} />)}
          </div>
          <div>
            {allSections.map((section, idx) => idx % 2 === 1 && <MenuSection key={idx} section={section} />)}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 mt-10 p-4 border-t border-gray-800">
          <p className="text-sm">Preços sujeitos a alteração. Consulte a disponibilidade.</p>
        </footer>
      </div>
    </div>
  );
}
