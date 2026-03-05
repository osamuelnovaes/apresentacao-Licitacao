import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence} from 'remotion';

const data = {
  titulo: 'Gerenciador de Anúncios',
  subtitulo: 'Resultados dos Últimos 5 Anos',
  investimentoTotal: 'R$ 100.000,00',
  leadsGerados: '15.200',
  vendasRealizadas: '3.800',
  receitaGerada: 'R$ 850.000,00',
  alcance: '2.500.000',
  cliquesAnuncios: '450.000',
  roi: '750%',
  faturamentoTotal: 'R$ 850.000,00',
  lucroTotal: 'R$ 750.000,00',
};

const GradientBackground = () => {
  const frame = useCurrentFrame();
  const hue = interpolate(frame, [0, 450], [220, 240]);
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(ellipse at 20% 80%, hsla(${hue}, 80%, 30%, 0.5) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, hsla(${hue + 20}, 70%, 25%, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, hsla(${hue + 10}, 60%, 18%, 0.6) 0%, transparent 70%),
        linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1a 100%)
      `,
    }} />
  );
};

const AppleCard = ({children, delay = 0}: {children: React.ReactNode; delay?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {damping: 15, stiffness: 80},
  });
  
  const opacity = interpolate(frame - delay, [0, 20], [0, 1]);
  
  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '28px',
      padding: '48px 64px',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    }}>
      {children}
    </div>
  );
};

const StatItem = ({label, value, icon, delay}: {label: string; value: string; icon: string; delay: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {damping: 12, stiffness: 100},
  });
  
  const opacity = interpolate(frame - delay, [0, 15], [0, 1]);
  
  return (
    <div style={{
      transform: `scale(${scale})`,
      opacity,
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '28px 36px',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      minWidth: '420px',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '4px',
        }}>
          {label}
        </div>
        <div style={{
          color: '#fff',
          fontSize: '38px',
          fontWeight: 700,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
        }}>
          {value}
        </div>
      </div>
    </div>
  );
};

const TitleSlide = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const y = interpolate(frame, [0, 30], [40, 0]);
  
  return (
    <AbsoluteFill>
      <GradientBackground />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}>
        <div style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '22px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '5px',
          marginBottom: '24px',
        }}>
          {data.subtitulo}
        </div>
        <div style={{
          color: '#fff',
          fontSize: '110px',
          fontWeight: 800,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
          marginBottom: '56px',
          textAlign: 'center',
          lineHeight: 1.1,
        }}>
          {data.titulo}
        </div>
        <AppleCard delay={20}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '18px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            Total Investido
          </div>
          <div style={{
            color: '#34d399',
            fontSize: '72px',
            fontWeight: 800,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
            textAlign: 'center',
          }}>
            {data.investimentoTotal}
          </div>
        </AppleCard>
      </div>
    </AbsoluteFill>
  );
};

const ResultsSlide = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 25], [0, 1]);
  
  const stats = [
    {label: 'Leads Gerados', value: data.leadsGerados, icon: '👥'},
    {label: 'Vendas Realizadas', value: data.vendasRealizadas, icon: '💰'},
    {label: 'Receita Gerada', value: data.receitaGerada, icon: '📈'},
    {label: 'Alcance', value: data.alcance, icon: '🎯'},
    {label: 'Cliques', value: data.cliquesAnuncios, icon: '🖱️'},
    {label: 'ROI', value: data.roi, icon: '🚀'},
  ];
  
  return (
    <AbsoluteFill>
      <GradientBackground />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 120px',
        opacity,
      }}>
        <div style={{
          color: '#fff',
          fontSize: '64px',
          fontWeight: 700,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
          marginBottom: '64px',
          textAlign: 'center',
        }}>
          Resultados Até Hoje
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          justifyItems: 'center',
        }}>
          {stats.map((stat, i) => (
            <StatItem key={i} label={stat.label} value={stat.value} icon={stat.icon} delay={i * 8} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FinalSlide = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = spring({frame, fps, config: {damping: 12}});
  
  return (
    <AbsoluteFill>
      <GradientBackground />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}>
        <div style={{
          display: 'flex',
          gap: '56px',
          transform: `scale(${scale})`,
        }}>
          <AppleCard delay={10}>
            <div style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '18px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              Faturamento Total
            </div>
            <div style={{
              color: '#fff',
              fontSize: '76px',
              fontWeight: 800,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
              textAlign: 'center',
            }}>
              {data.faturamentoTotal}
            </div>
          </AppleCard>
          <AppleCard delay={25}>
            <div style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '18px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              Lucro Total
            </div>
            <div style={{
              color: '#34d399',
              fontSize: '76px',
              fontWeight: 800,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
              textAlign: 'center',
            }}>
              {data.lucroTotal}
            </div>
          </AppleCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ResultadosVideo = () => {
  return (
    <>
      <Sequence durationInFrames={150} from={0}>
        <TitleSlide />
      </Sequence>
      <Sequence durationInFrames={180} from={150}>
        <ResultsSlide />
      </Sequence>
      <Sequence durationInFrames={120} from={330}>
        <FinalSlide />
      </Sequence>
    </>
  );
};
