<!doctype html>
<html @php(language_attributes())>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  @php(do_action('get_header'))
  @php(wp_head())
</head>

<body @php(body_class()) data-barba="wrapper">
  <div data-barba="container" data-barba-namespace="{{ get_post_field('post_name', get_post()) }}">
    @php(wp_body_open())

    <div id="app">
      <a class="sr-only focus:not-sr-only" href="#main">
        {{ __('Skip to content') }}
      </a>

      @include('sections.header')

      <a href="/">Home</a>
      <a href="/sample-page" data-transition="fade-to-black">Sample</a>

      <main id="main" class="main" mouse-follow>
        @yield('content')

        <div class="media --reveal" style="width: 25vw; height: 50vh; position: relative; overflow: hidden;">
          <div class="media__inner" style="position: absolute; inset: 0;">
            <img
              src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=3223&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style="position: absolute; inset: 0; object-fit: cover; object-position: center; width: 100%; height: 100%;" />
          </div>
        </div>
      </main>

      @hasSection('sidebar')
        <aside class="sidebar">
          @yield('sidebar')
        </aside>
      @endif

      @include('sections.footer')
    </div>

    @php(do_action('get_footer'))
    @php(wp_footer())
  </div>
</body>

</html>
