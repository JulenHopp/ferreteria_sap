from xgboost import XGBClassifier

def build_model():
    """
    Crea y retorna una instancia del modelo XGBoost con los parámetros adecuados.
    """
    return XGBClassifier(use_label_encoder=False, eval_metric="logloss")
