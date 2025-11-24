function safeCtx(id) {
    const el = document.getElementById(id);
    if (!el) {
        return null;
    }
    return el.getContext('2d');
}

Chart.defaults.font.size = 13;
Chart.defaults.plugins.legend.align = 'end';
Chart.defaults.plugins.legend.position = 'bottom';

function getGradient(ctx, area, colorStops) {
    const grad = ctx.createLinearGradient(0, 0, 0, (area && area.bottom) || 200);
    colorStops.forEach(cs => grad.addColorStop(cs[0], cs[1]));
    return grad;
}

(function () {
    const labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
    const data = [45, 42, 34, 51, 46];
    const ctx = safeCtx('grafico1');
    if (!ctx) return;
    const grad = getGradient(ctx, { bottom: 200 }, [[0, 'rgba(79,70,229,0.9)'], [1, 'rgba(6,182,212,0.2)']]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Visita ao site',
                data,
                backgroundColor: grad,
                borderRadius: 8,
                borderWidth: 0,
                maxBarThickness: 40,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false }, ticks: { maxRotation: 0 } },
                y: { beginAtZero: true, grid: { color: 'rgba(15,23,42,0.04)' }, ticks: { stepSize: 10 } }
            }
        }
    });

    document.getElementById('visitasTotal').textContent = data.reduce((s, n) => s + n, 0);
})();

(function () {
    const labels = ['Março', 'Abril', 'Maio'];
    const data = [123, 156, 189];
    const ctx = safeCtx('grafico2');
    if (!ctx) return;
    const gradLine = getGradient(ctx, { bottom: 200 }, [[0, 'rgba(6,182,212,0.9)'], [1, 'rgba(99,102,241,0.1)']]);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels, datasets: [{
                label: 'Vendas do Ano',
                data,
                tension: 0.4,
                pointRadius: 4,
                borderWidth: 3,
                borderColor: '#06b6d4',
                fill: true,
                backgroundColor: gradLine
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: { mode: 'index', intersect: false },
                legend: { display: false }
            },
            scales: { y: { beginAtZero: true, grid: { color: 'rgba(15,23,42,0.04)' } } }
        }
    });

    const pct = Math.round((data[data.length - 1] - data[0]) / data[0] * 100);
    document.getElementById('crescimentoPct').textContent = (pct > 0 ? '+' + pct : pct) + '%';
})();