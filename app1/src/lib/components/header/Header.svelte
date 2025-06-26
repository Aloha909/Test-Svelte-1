<script>
  let title = $state("La ToDo App");
  const handleClick = () => {
    alert("Bouton cliqué !");
    title = "La Todo App d'Alois & Asmae"
  };
</script>

<header class="header">
  <div class="container">
    <h1>{title}</h1>
    <button class="header-btn" onclick={handleClick}>
      Changer titre
    </button>
  </div>
</header>

<style lang="scss"></style>
