import React from 'react';
import './InfoTooltip.css';
import success from '../../images/success.svg';
import fail from '../../images/fail.svg';

function InfoTooltip({ isOpen, onClose, title, regImage }) {
	return (
		<div className={`popup ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				<div className="popup-InfoTooltip">
					<button type="button" className="button button_type_close" onClick={onClose} />
					{regImage ? (<img src={success} alt="Успешно" className="popup-InfoTooltip__image" />) :
						(<img src={fail} alt="Ошибка" className="popup-InfoTooltip__image" />)}
					<h3 className="popup-InfoTooltip__title">{title}</h3>
				</div>
			</div>
		</div>
	)
}

export default InfoTooltip;