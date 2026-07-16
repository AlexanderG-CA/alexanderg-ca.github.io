import './StarBorder.css'

export default function StarBorder({
  as: Component = 'div',
  className = '',
  color = '#e8a849',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style,
      }}
      {...rest}
    >
      <span
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
        aria-hidden="true"
      />
      <span
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
        aria-hidden="true"
      />
      <span className="inner-content">{children}</span>
    </Component>
  )
}
