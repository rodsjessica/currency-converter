import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyTable from '../components/CurrencyTable';
import { CurrencyRow } from '../types';

const mockData: CurrencyRow[] = [
  { currency: 'EUR', value: '5.27', time: '10/06/2023 às 22:30' },
  { currency: 'USD', value: '4.85', time: '10/06/2023 às 22:30' },
  { currency: 'GBP', value: '6.10', time: '10/06/2023 às 22:30' },
];

describe('CurrencyTable', () => {
  it('renderiza a tabela corretamente', () => {
    render(<CurrencyTable data={mockData} />);
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
  });

  it('ordena os dados pela coluna "Moeda" em ordem ascendente', () => {
    render(<CurrencyTable data={mockData} />);
    const moedaHeader = screen.getByText('Moeda');
    fireEvent.click(moedaHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('EUR');
    expect(rows[2]).toHaveTextContent('GBP');
    expect(rows[3]).toHaveTextContent('USD');
  });

  it('ordena os dados pela coluna "Moeda" em ordem descendente', () => {
    render(<CurrencyTable data={mockData} />);
    const moedaHeader = screen.getByText('Moeda');
    fireEvent.click(moedaHeader); // Primeiro clique para ordem ascendente
    fireEvent.click(moedaHeader); // Segundo clique para ordem descendente

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('USD');
    expect(rows[2]).toHaveTextContent('GBP');
    expect(rows[3]).toHaveTextContent('EUR');
  });

  it('ordena os dados pela coluna "Valor (em BRL)" em ordem ascendente', () => {
    render(<CurrencyTable data={mockData} />);
    const valorHeader = screen.getByText('Valor (em BRL)');
    fireEvent.click(valorHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('4.85'); // USD
    expect(rows[2]).toHaveTextContent('5.27'); // EUR
    expect(rows[3]).toHaveTextContent('6.10'); // GBP
  });

  it('ordena os dados pela coluna "Valor (em BRL)" em ordem descendente', () => {
    render(<CurrencyTable data={mockData} />);
    const valorHeader = screen.getByText('Valor (em BRL)');
    fireEvent.click(valorHeader); // Primeiro clique para ordem ascendente
    fireEvent.click(valorHeader); // Segundo clique para ordem descendente

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('6.10'); // GBP
    expect(rows[2]).toHaveTextContent('5.27'); // EUR
    expect(rows[3]).toHaveTextContent('4.85'); // USD
  });

  it('ordena os dados pela coluna "Horário" em ordem ascendente', () => {
    render(<CurrencyTable data={mockData} />);
    const horarioHeader = screen.getByText('Horário');
    fireEvent.click(horarioHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('EUR'); // Mantém a ordem original
    expect(rows[2]).toHaveTextContent('USD');
    expect(rows[3]).toHaveTextContent('GBP');
  });

});