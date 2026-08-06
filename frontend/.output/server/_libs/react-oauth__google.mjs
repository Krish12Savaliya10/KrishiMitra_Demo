import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "./@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/@react-oauth/google/dist/index.esm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLoadGsiScript(options = {}) {
	const { nonce, locale, onScriptLoadSuccess, onScriptLoadError } = options;
	const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = (0, import_react.useState)(false);
	const onScriptLoadSuccessRef = (0, import_react.useRef)(onScriptLoadSuccess);
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;
	const onScriptLoadErrorRef = (0, import_react.useRef)(onScriptLoadError);
	onScriptLoadErrorRef.current = onScriptLoadError;
	(0, import_react.useEffect)(() => {
		const scriptTag = document.createElement("script");
		scriptTag.src = "https://accounts.google.com/gsi/client";
		if (locale) scriptTag.src += `?hl=${locale}`;
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.nonce = nonce;
		scriptTag.onload = () => {
			var _a;
			setScriptLoadedSuccessfully(true);
			(_a = onScriptLoadSuccessRef.current) === null || _a === void 0 || _a.call(onScriptLoadSuccessRef);
		};
		scriptTag.onerror = () => {
			var _a;
			setScriptLoadedSuccessfully(false);
			(_a = onScriptLoadErrorRef.current) === null || _a === void 0 || _a.call(onScriptLoadErrorRef);
		};
		document.body.appendChild(scriptTag);
		return () => {
			document.body.removeChild(scriptTag);
		};
	}, [nonce]);
	return scriptLoadedSuccessfully;
}
var GoogleOAuthContext = (0, import_react.createContext)(null);
function GoogleOAuthProvider({ clientId, nonce, locale, onScriptLoadSuccess, onScriptLoadError, children }) {
	const scriptLoadedSuccessfully = useLoadGsiScript({
		nonce,
		onScriptLoadSuccess,
		onScriptLoadError,
		locale
	});
	const contextValue = (0, import_react.useMemo)(() => ({
		locale,
		clientId,
		scriptLoadedSuccessfully
	}), [clientId, scriptLoadedSuccessfully]);
	return import_react.createElement(GoogleOAuthContext.Provider, { value: contextValue }, children);
}
function useGoogleOAuth() {
	const context = (0, import_react.useContext)(GoogleOAuthContext);
	if (!context) throw new Error("Google OAuth components must be used within GoogleOAuthProvider");
	return context;
}
function extractClientId(credentialResponse) {
	var _a;
	return (_a = credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.clientId) !== null && _a !== void 0 ? _a : credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.client_id;
}
var containerHeightMap = {
	large: 40,
	medium: 32,
	small: 20
};
function GoogleLogin({ onSuccess, onError, useOneTap, promptMomentNotification, type = "standard", theme = "outline", size = "large", text, shape, logo_alignment, width, click_listener, state, containerProps, login_hint, ...props }) {
	const btnContainerRef = (0, import_react.useRef)(null);
	const { clientId, locale, scriptLoadedSuccessfully } = useGoogleOAuth();
	const onSuccessRef = (0, import_react.useRef)(onSuccess);
	onSuccessRef.current = onSuccess;
	const onErrorRef = (0, import_react.useRef)(onError);
	onErrorRef.current = onError;
	const promptMomentNotificationRef = (0, import_react.useRef)(promptMomentNotification);
	promptMomentNotificationRef.current = promptMomentNotification;
	(0, import_react.useEffect)(() => {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j;
		if (!scriptLoadedSuccessfully) return;
		(_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 || _c.initialize({
			client_id: clientId,
			callback: (credentialResponse) => {
				var _a;
				if (!(credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.credential)) return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef);
				const { credential, select_by } = credentialResponse;
				onSuccessRef.current({
					credential,
					clientId: extractClientId(credentialResponse),
					select_by
				});
			},
			login_hint,
			...props
		});
		(_f = (_e = (_d = window === null || window === void 0 ? void 0 : window.google) === null || _d === void 0 ? void 0 : _d.accounts) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 || _f.renderButton(btnContainerRef.current, {
			type,
			theme,
			size,
			text,
			shape,
			logo_alignment,
			width,
			locale,
			click_listener,
			state
		});
		if (useOneTap) (_j = (_h = (_g = window === null || window === void 0 ? void 0 : window.google) === null || _g === void 0 ? void 0 : _g.accounts) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 || _j.prompt(promptMomentNotificationRef.current);
		return () => {
			var _a, _b, _c;
			if (useOneTap) (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 || _c.cancel();
		};
	}, [
		clientId,
		scriptLoadedSuccessfully,
		useOneTap,
		type,
		theme,
		size,
		text,
		shape,
		logo_alignment,
		width,
		locale,
		login_hint
	]);
	return import_react.createElement("div", {
		...containerProps,
		ref: btnContainerRef,
		style: {
			height: containerHeightMap[size],
			...containerProps === null || containerProps === void 0 ? void 0 : containerProps.style
		}
	});
}
//#endregion
export { GoogleOAuthProvider as n, GoogleLogin as t };
